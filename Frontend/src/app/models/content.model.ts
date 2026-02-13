export interface Content {
  _id: string;
  title: string;
  description: string;
  contentType: 'article' | 'announcement' | 'product' | 'service';
  status: 'draft' | 'published' | 'archived';
  author: {
    _id: string;
    name: string;
    email: string;
  };
  views: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface CreateContentRequest {
  title: string;
  description: string;
  contentType: string;
  status: string;
}
