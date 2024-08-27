import { Controller, Get, Post, Body, Patch,Put, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  //Buscar por id 
  @Get(':term')
  findOne(@Param('term', ParseIntPipe) term: string) {
    return this.usersService.findOne(term, "id");
  }

  //Buscar por email 
  @Get('email/:term')
  findOneByEmail(@Param('term') term: string) {
    return this.usersService.findOne(term, "email");
  }

  @Put(':id')
  updateElement (@Param('id', ParseIntPipe) id: string, @Body() updateUserDto: CreateUserDto): string {
   // return this.usersService.updateElement(+id, updateUserDto);
   return ''
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.remove(id);
  }
}
