declare namespace API {
  export interface CurrentUser {
    avatar?: string;
    username?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
      key: string;
      label: string;
    }[];
    userid?: string;
    access?: 'user' | 'guest' | 'admin';
    unreadCount?: number;
    hasRoutes?:string[]
  }

  export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;//account mobile
    token?:string
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
