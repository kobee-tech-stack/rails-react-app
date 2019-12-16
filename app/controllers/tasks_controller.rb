class TasksController < ApplicationController
  def index
    @tasks = Task.all
    render json: @tasks
  end

  def create
    @task = Task.create(title: params[:title], description: params[:description])
  end

  def show
    @task = Task.find(params[:id])
    render json: @task
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(title: params[:task][:title], description: params[:task][:description])
    render json: @task
  end

  def destroy
    @task = Task.find(params[:id])
    if @task.destroy
      head :no_content, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end
end
