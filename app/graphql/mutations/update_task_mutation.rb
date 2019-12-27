module Mutations
  class UpdateTaskMutation < BaseMutation
    graphql_name "update_task"
    null true
    description "update task"

    argument :id, Int, required: true
    argument :title, String, required: true
    argument :description, String, required: true

    field :task, Types::TaskType, null: true

    def resolve(id:, title:, description:)
      begin
        task = Task.find(id)
        task.update_attributes(title: title, description: description)
      rescue => e
        return GraphQL::ExecutionError.new(e.message)
      end
      { task: task }
    end
  end
end
