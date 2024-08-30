import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ schema: 'dev', name: 'users' })
export class UserEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column('text', {unique:true, nullable: false})  
    username:string;

    @Column('text', {unique:true, nullable: false})
    email:string;

    @Column('text', { nullable: false})
    password:string;

    @Column('text')
    first_name:string;

    @Column('text')
    last_name:string;

    @Column('text', {default: () => 'CURRENT_TIMESTAMP'})
    created_at:string;


    @Column('text')
    updated_at?:string;

    @Column('text',{ nullable: false} )
    state:string;

    @BeforeInsert()
    setDates() {
      this.created_at = new Date().toISOString();
      this.updated_at = new Date().toISOString(); // Establece el formato ISO 8601
    }


    @BeforeUpdate()
    setUpdatedAt() {
      this.updated_at = new Date().toISOString(); // Establece el formato ISO 8601
    }

}
