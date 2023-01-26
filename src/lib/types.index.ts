export type FolderStructureType = {
  id: string;
  userId: string;

  name: string;
  parentRef: string; // points to the parent folder
  status: 'ACTIVE' | 'STARRED' | 'DELETED'

  creationDate: string;
};