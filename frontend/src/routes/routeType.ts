import { ReactNode } from "react";


// Enum for layout types
export enum LayoutType {
    HOME = "HomeLayout",
    NONE = "None", 
  }

export interface RouteOptions {
    key: string;
    path: string;
    element: ReactNode;
    isProtected: boolean;
    layout: LayoutType;
  }
  