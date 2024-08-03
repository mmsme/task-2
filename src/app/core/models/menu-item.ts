export interface MenuItem {
  name: string;
  icon: string | null;
  link: string | null;
  image: string | null;
  children?: MenuItem[];
  permissions?: string[];
  roles?: string[];
  iconFill?: boolean;
}
