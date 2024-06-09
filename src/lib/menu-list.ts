import { 
  MdLibraryMusic,
  MdMusicNote,
  MdSubscriptions,
} from "react-icons/md";
import { AiOutlineRise } from "react-icons/ai";
import { PlaylistIcon } from '@vidstack/react/icons';
import { FaUser } from "react-icons/fa";
import { useAuth } from "@/hooks/UseAuth";
import { Item } from "@radix-ui/react-dropdown-menu";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: any;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const user = useAuth()  
 
  if(!user) return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Музыка",
          active: pathname.includes("/home"),
          icon: MdLibraryMusic,
          submenus: []
        },
        {
          href: "/trands",
          label: "Популярное",
          active: pathname.includes("/trands"),
          icon: MdLibraryMusic,
          submenus: []
        },
      ]
    }
  ]
  else return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/home",
          label: "Музыка",
          active: pathname.includes("/home"),
          icon: MdLibraryMusic,
          submenus: []
        },        
        {
          href: "/trands",
          label: "Популярное",
          active: pathname.includes("/trands"),
          icon: AiOutlineRise,
          submenus: []
        },
      ]
    },
    {
      groupLabel: "Основной контент",
      menus: [
        {
          href: "",
          label: "Плейлисты",
          active: pathname.includes("/playlists"),
          icon: PlaylistIcon,
          submenus: [
            {
              href: "/playlists",
              label: "Все плейлисты",
              active: pathname === "/playlists"
            },
            {
              href: `/playlists/user/${user.user?.id}`,
              label: "Мои плейлисты",
              active: pathname === `/playlists/user/${user.user?.id}`
            }
          ]
        },
        {
          href: `/studio`,
          label: "Моя музыка",
          active: pathname.includes("/studio"),
          icon: MdMusicNote,
          submenus: []
        },
        {
          href: "/my-subscriptions",
          label: "Мои подписки",
          active: pathname.includes("/my-subscriptions"),
          icon: MdSubscriptions,
          submenus: []
        },       
      ]
    },
    {
      groupLabel: "Настройки",
      menus: [        
        {
          href: `/user/${user.user?.id}`,
          label: "Мой аккаунт",
          active: pathname.includes(`/user/${user.user?.id}`),
          icon: FaUser,
          submenus: []
        }
      ]
    }
  ];
}
