import { IAService } from "@/core/interfaces/IA/IAService";

export class SuggestGroupsUseCase {
  constructor(private iaService: IAService) {}

  async execute(prompt: string): Promise<string[]> {
    return await this.iaService.suggestGroups(prompt);
  }
}