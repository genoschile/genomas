export type IAResponse = {
  success: boolean;
  message?: string;
  prompt?: string[];
  error?: string;
};

export interface IAService {
  suggestGroups(roleId: string, prompt: string): Promise<IAResponse>;
}
