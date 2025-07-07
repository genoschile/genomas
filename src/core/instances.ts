import { GroupRepository } from "./repositories/groupRepository";
import { OrganizationRepository } from "./repositories/organizationRepository";
import { ProjectRepository } from "./repositories/projectRepository";
import { UserRepository } from "./repositories/userRepository";
import { useCaseOrganizationUseCase } from "./use-cases/organization/useCaseOrganization";
import { useCaseProjects } from "./use-cases/project/useCaseProject";
import { useCaseUsers } from "./use-cases/user/useCaseUsers";
import { useCaseGroup } from "./use-cases/group/useCaseGroup";
import { SuggestionsUseCases } from "./use-cases/suggestionsIA/suggestionsUseCases";
import { OpenAIService } from "./repositories/IAServices";

export const useCaseSuggestions = new SuggestionsUseCases(new OpenAIService());
export const useCaseUser = new useCaseUsers(new UserRepository());
export const useCaseProject = new useCaseProjects(new ProjectRepository());
export const useCaseOrganization = new useCaseOrganizationUseCase(
  new OrganizationRepository()
);
export const useCaseGroups = new useCaseGroup(new GroupRepository());
