module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World!"
    end

    field :task, TaskType, null: true do
      description "Find a task by ID"
      argument :id, ID, required: true
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
