class ProductsController < ApplicationController

  def index
    @product = Product.all
    render json: @product
  end

  def create
    @product = Product.create(product: params[:product])
    render json: @product
  end

  def update
    @product = Product.find(params:[:id])
    @product.update_attributes(product:params[:product])
    render json: @product
  end

  def destory
    @product = Product.find(params[:id])
    if @product.destory
      head :no_content, status: :ok
    else
      ender json: @product.errors, status: :unprocessable_entity
    end
  end
end
