import { IAResponse, IAService } from "@/core/interfaces/IAService";

export class SuggestionsUseCases {
  constructor(private iaService: IAService) {}

  async execute(roleId: string, prompt: string): Promise<IAResponse> {
    return await this.iaService.suggestGroups(roleId, prompt);
  }
}
