module Types
  class MutationType < Types::BaseObject
    field :update_task_mutation, mutation: Mutations::UpdateTaskMutation
  end
end
