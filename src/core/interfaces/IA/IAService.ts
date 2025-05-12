export type IAResponse =
  | {
      success: boolean;
      message: string;
      usuario: string[];
      grupos: string[];
      acceso: string[];
      error?: string;
    }
  | {
      success: boolean;
      message?: string;
      error: string;
    };

export interface IAService {
  suggestGroups(prompt: string): Promise<IAResponse>;
}
