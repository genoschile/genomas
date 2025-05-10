export interface IAService {
  suggestGroups(prompt: string): Promise<string[]>;
}
