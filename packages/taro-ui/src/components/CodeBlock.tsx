import React from 'react';
import { ScrollView, Text, View } from '@tarojs/components';
import { cx } from './utils';
import './styles.css';

const COLORS = {
  comment: '#6b5e50',
  string: '#a8d4a0',
  keyword: '#d4a0e0',
  react: '#e06c75',
  component: '#80c0e0',
  func: '#61afef',
  prop: '#e8c87a',
  jsx: '#f0a870',
  operator: '#d4b896',
  number: '#a8d4a0',
  default: '#e8d5bc'
};

interface HighlightToken {
  text: string;
  color: string;
  key: string;
}

const highlightJSX = (code: string): HighlightToken[] => {
  const tokens: { start: number; end: number; color: string }[] = [];

  const addPattern = (regex: RegExp, color: string) => {
    let match: RegExpExecArray | null;
    const re = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : `${regex.flags}g`);
    while ((match = re.exec(code)) !== null) {
      tokens.push({
        start: match.index,
        end: match.index + match[0].length,
        color
      });
    }
  };

  addPattern(/\/\*[\s\S]*?\*\//g, COLORS.comment);
  addPattern(/\/\/.*$/gm, COLORS.comment);
  addPattern(/`[^`]*`/g, COLORS.string);
  addPattern(/"[^"]*"/g, COLORS.string);
  addPattern(/'[^']*'/g, COLORS.string);
  addPattern(/<\/?[A-Z][\w.$]*/g, COLORS.jsx);
  addPattern(/<\/?[a-z][\w-]*/g, COLORS.jsx);
  addPattern(/\/?>/g, COLORS.jsx);
  addPattern(
    /\b(React|useState|useEffect|useCallback|useMemo|useRef|useContext|useReducer|useLayoutEffect|useImperativeHandle|useDebugValue|createContext|createElement|cloneElement|Fragment|Suspense|lazy|memo|forwardRef|useId|FC|ReactNode|ReactElement|CSSProperties)\b/g,
    COLORS.react
  );
  addPattern(/\b(true|false)\b/g, COLORS.keyword);
  addPattern(/\b(null|undefined|void|NaN|Infinity)\b/gi, COLORS.keyword);
  addPattern(/\b\d+\.?\d*\b/g, COLORS.number);
  addPattern(
    /\b(import|from|as|export|default|const|let|var|function|return|if|else|for|while|switch|case|break|continue|try|catch|throw|finally|new|typeof|instanceof|async|await|type|interface)\b/gi,
    COLORS.keyword
  );
  addPattern(/\b[A-Z][a-zA-Z0-9_$]*\b/g, COLORS.component);
  addPattern(/\b[a-z][a-zA-Z0-9_$]*\s*(?=\()/g, COLORS.func);
  addPattern(/\b[a-zA-Z_$][\w$]*\s*(?==)/g, COLORS.prop);
  addPattern(/>|===|!==|==|!=|<=|>=|&&|\|\||[+\-*/%=<>!&|^~?:]/g, COLORS.operator);
  addPattern(/[{}[\]();,]/g, COLORS.operator);

  tokens.sort((a, b) => a.start - b.start);

  const result: HighlightToken[] = [];
  let pos = 0;

  for (const token of tokens) {
    if (token.start < pos) continue;

    if (token.start > pos) {
      result.push({
        key: `t${pos}`,
        text: code.slice(pos, token.start),
        color: COLORS.default
      });
    }

    result.push({
      key: `s${token.start}`,
      text: code.slice(token.start, token.end),
      color: token.color
    });
    pos = token.end;
  }

  if (pos < code.length) {
    result.push({
      key: `e${pos}`,
      text: code.slice(pos),
      color: COLORS.default
    });
  }

  return result;
};

export interface CodeBlockProps {
  code: string;
  style?: React.CSSProperties;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, style, className }) => {
  const tokens = highlightJSX(code);

  return (
    <ScrollView scrollX className={cx('ai-code-block', className)} style={style}>
      <View className="ai-code-block-inner">
        {tokens.map((token) => (
          <Text key={token.key} space="nbsp" className="ai-code-block-token" style={{ color: token.color }}>
            {token.text}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

CodeBlock.displayName = 'CodeBlock';
