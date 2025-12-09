import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private prisma:PrismaService) {}  



  async createPortfolio(createPortfolioDto: CreatePortfolioDto) {
    try {
      const portfolio = await this.prisma.portfolio.create({
        data: createPortfolioDto,
      })
      return portfolio;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create portfolio');
    }
  }

  async getAllPortfolio() {
    try {
      const portfolios = await this.prisma.portfolio.findMany();
      if(!portfolios){
           throw new InternalServerErrorException("No portfolios found");
      }
      return portfolios;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve portfolios');
    }
  }

  async getSinglePortfolio(id: string) {
    try {
      const portfolio = await this.prisma.portfolio.findUnique({
        where: { id: id },
      });
      if(!portfolio){
           throw new InternalServerErrorException("Portfolio not found");
      }
      return portfolio;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve portfolio');
    }
  }

  async updatePortfolio(id: string, updatePortfolioDto: UpdatePortfolioDto) {
    try {
      const updatedPortfolio = await this.prisma.portfolio.update({
        where:{id:id},
        data:updatePortfolioDto
      })
      if(!updatedPortfolio){
        throw new InternalServerErrorException('Failed to retrieve user profile.');
      }
      return updatedPortfolio;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update portfolio');
    }
  }

  async deletePortfolio(id: string) {
     try {
      await this.prisma.portfolio.delete({
        where:{id:id}
      })
      return {message:"Portfolio deleted successfully"};
     } catch (error) {
      throw new InternalServerErrorException('Failed to delete portfolio');
     }
  }
}
