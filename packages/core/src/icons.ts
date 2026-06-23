export type AnimalIconName =
  | 'icon-miles'
  | 'icon-camera'
  | 'icon-chat'
  | 'icon-critterpedia'
  | 'icon-design'
  | 'icon-diy'
  | 'icon-helicopter'
  | 'icon-map'
  | 'icon-shopping'
  | 'icon-variant';

export const iconList = [
  { name: 'icon-miles', label: 'NookMiles' },
  { name: 'icon-camera', label: 'Camera' },
  { name: 'icon-chat', label: 'Chat' },
  { name: 'icon-critterpedia', label: 'Critterpedia' },
  { name: 'icon-design', label: 'Design' },
  { name: 'icon-diy', label: 'DIY' },
  { name: 'icon-helicopter', label: 'Helicopter' },
  { name: 'icon-map', label: 'Map' },
  { name: 'icon-shopping', label: 'Shopping' },
  { name: 'icon-variant', label: 'Variant' }
] as const satisfies ReadonlyArray<{ name: AnimalIconName; label: string }>;

export const iconColorMap: Record<AnimalIconName, string> = {
  'icon-miles': '#f4cf58',
  'icon-camera': '#82d5bb',
  'icon-chat': '#9bd7f4',
  'icon-critterpedia': '#f8dc75',
  'icon-design': '#9fd38a',
  'icon-diy': '#f5b36a',
  'icon-helicopter': '#ef8b7d',
  'icon-map': '#cdb5f8',
  'icon-shopping': '#f7b6c8',
  'icon-variant': '#b9dc75'
};
