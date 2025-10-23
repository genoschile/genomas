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

// Factory functions
export const createUserUseCase = () => new useCaseUsers(new UserRepository());
export const createProjectUseCase = () =>
  new useCaseProjects(new ProjectRepository());
export const createOrganizationUseCase = () =>
  new useCaseOrganizationUseCase(new OrganizationRepository());
export const createGroupUseCase = () => new useCaseGroup(new GroupRepository());
export const createSuggestionsUseCase = () =>
  new SuggestionsUseCases(new OpenAIService());

// Instancias globales (singleton)
export const useCaseUser = createUserUseCase();
export const useCaseProject = createProjectUseCase();
export const useCaseOrganization = createOrganizationUseCase();
export const useCaseGroups = createGroupUseCase();
export const useCaseSuggestions = createSuggestionsUseCase();

// Getters por conveniencia
export const getUserUseCase = () => useCaseUser;
export const getProjectUseCase = () => useCaseProject;
export const getOrganizationUseCase = () => useCaseOrganization;
export const getGroupUseCase = () => useCaseGroups;
export const getSuggestionsUseCase = () => useCaseSuggestions;
