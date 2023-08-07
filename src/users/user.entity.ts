import { Exclude } from "class-transformer";
import { Report } from "src/reports/report.entity";
import { Column, PrimaryGeneratedColumn,Entity, AfterInsert, AfterRemove, AfterUpdate,OneToMany } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string

    @OneToMany(()=>Report,(report)=>report.user)
    reports:Report[];

    @AfterInsert()
    logInsert(){
        console.log("Inserted user with id", this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log("Updated user with id", this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log("Removed user with id", this.id);
    }

}