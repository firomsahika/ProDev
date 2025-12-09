import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Post()
  async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) {
    try {
      const portfolio = await this.portfolioService.createPortfolio(createPortfolioDto);
      return {
        statusCode:HttpStatus.CREATED,
        message:"Portfolio created successfully!",
        data:portfolio,
      }
    } catch (error) {
        throw new InternalServerErrorException('Failed to retrieve users.');
      
    }
  }

  @Get()
  async findAllPortfolio() {
    try {
      const portfolios = await this.portfolioService.getAllPortfolio();
      return {
        statusCode:HttpStatus.OK,
        message:"Portfolios retrieved successfully!",
        data:portfolios,
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve portfolios.');
    }
  }

  @Get(':id')
  async findSinglePortfolio(@Param('id') id: string) {
    try {
      const portfolio = await this.portfolioService.getSinglePortfolio(id);
      return {
        statusCode:HttpStatus.OK,
        message:"Portfolio retrieved successfully!",
        data:portfolio,
      }
    } catch (error) {
      
    }
  }

  @Patch(':id')
  async updatePortfolio(@Param('id') id: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const updatedPortfolio = await this.portfolioService.updatePortfolio(id, updatePortfolioDto);
      return {
        statusCode: HttpStatus.OK,
        message: "Portfolio updated successfully!",
        data: updatedPortfolio,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update portfolio.');
    }
  }

  @Delete(':id')
  async deletePortfolio(@Param('id') id: string) {
    try {
      const deletedPortfolio = await this.portfolioService.deletePortfolio(id);
      return {
        statusCode: HttpStatus.OK,
        message: "Portfolio deleted successfully!",
        data: deletedPortfolio,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete portfolio.');  
    }
  }
}
