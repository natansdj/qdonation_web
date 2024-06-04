export interface UserType {
  data: []
}

export interface ReadData {
  to: string,
}

export interface ChatItem {
  to: string,
  me: string,
  chat: string,
  read: boolean,
  id: any
}
