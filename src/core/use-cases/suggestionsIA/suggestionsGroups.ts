import { IAResponse, IAService } from "@/core/interfaces/IA/IAService";

export class SuggestGroupsUseCase {
  constructor(private iaService: IAService) {}

  async execute(prompt: string): Promise<IAResponse> {
    return await this.iaService.suggestGroups(prompt);
  }
}
