import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Organization } from '../../../core/organization/organization.entity';
import { CreateOrganizationInput } from '../../../core/organization/dtos/create-organization.input';
import { OrganizationService } from '../../../core/organization/organization.service';

import { UpdateOrganizationInput } from '../../../core/organization/dtos/update-organization.input';

@Resolver((of) => Organization)
export class OrganizationResolver {
  constructor(private readonly service: OrganizationService) {}

  @Query(() => [Organization])
  async organizations(): Promise<Organization[]> {
    return this.service.find();
  }

  @Query(() => Organization)
  async organization(
    @Args('orgId') orgId: string,
  ): Promise<Organization | undefined | never> {
    return this.service.findById(orgId);
  }

  @Mutation(() => Organization)
  async createOrganization(
    @Args('input') input: CreateOrganizationInput,
  ): Promise<Organization | never> {
    return await this.service.create(input);
  }

  @Mutation(() => Organization)
  async updateOrganization(
    @Args('input') input: UpdateOrganizationInput,
  ): Promise<Organization | never> {
    return await this.service.update(input);
  }

  @Mutation(() => Boolean)
  async deleteOrganization(
    @Args('orgId') orgId: string,
  ): Promise<boolean | never> {
    return await this.service.remove(orgId);
  }
}
