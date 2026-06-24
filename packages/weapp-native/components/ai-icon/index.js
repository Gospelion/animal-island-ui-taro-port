const iconAssetMap = {
  'icon-miles': './icons/icon-miles.svg',
  'icon-camera': './icons/icon-camera.svg',
  'icon-chat': './icons/icon-chat.svg',
  'icon-critterpedia': './icons/icon-critterpedia.svg',
  'icon-design': './icons/icon-design.svg',
  'icon-diy': './icons/icon-diy.svg',
  'icon-helicopter': './icons/icon-helicopter.svg',
  'icon-leaf': './icons/icon-leaf.png',
  'icon-map': './icons/icon-map.svg',
  'icon-shopping': './icons/icon-shopping.svg',
  'icon-variant': './icons/icon-variant.svg'
};

Component({
  properties: {
    name: { type: String, value: 'icon-miles' },
    src: { type: String, value: '' },
    size: { type: String, value: '48rpx' },
    bounce: { type: Boolean, value: false },
    customClass: { type: String, value: '' },
    customStyle: { type: String, value: '' }
  },
  data: {
    resolvedSrc: './icons/icon-miles.svg'
  },
  observers: {
    'name, src': function updateIconSource(name, src) {
      this.setData({
        resolvedSrc: src || iconAssetMap[name] || ''
      });
    }
  }
});
