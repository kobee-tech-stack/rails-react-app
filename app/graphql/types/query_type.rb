module Types
  class QueryType < Types::BaseObject
    field :task, TaskType, null: true do
      description "Find a task by ID"
      argument :id, Int, required: true
    end

    def task(id:)
      Task.find(id)
    end


    field :tasks, TaskType.connection_type, null: true do
      description "Find all tasks"
    end

    def tasks
      Task.all
    end
  end
end
