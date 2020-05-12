DROP DATABASE IF EXISTS employeeTracker;
create database employeeTracker;
use employeeTracker;
CREATE TABLE department(id int auto_increment primary key,
name varchar(30));
CREATE TABLE empRole (id int auto_increment primary key,
title varchar(30), salary decimal, department_id int references
department(id));
create table employee (id int auto_increment primary key, first_name
varchar(30), last_name varchar(30), role_id int references empRole(id),
manager_id int);
insert into department(name) values("production");
insert into department(name) values("IT");
insert into department(name) values("HR");
select *from department;
insert into empRole(title,salary,department_id)values("Manager",2100,1);
insert into empRole(title,salary,department_id)values("Manager",2100,2);
insert into empRole(title,salary,department_id)values("Manager",1900,3);
insert into empRole(title,salary,department_id)values("Production Engineer",1200,1);
insert into empRole(title,salary,department_id)values("Systems Engineer",1400,2);
insert into empRole(title,salary,department_id)values("Team Lead",1800,3);
select *from empRole;
insert into employee (first_name,last_name, role_id,manager_id)values("Tunde","Kilani",1,null); -- manger for production
insert into employee (first_name,last_name, role_id,manager_id)values("Ayo","Samueli",2,null);-- manager for it
insert into employee (first_name,last_name, role_id,manager_id)values("Danny","Odesin",3,null);-- manger for hr
insert into employee (first_name,last_name, role_id,manager_id) values ("Adeyemo", "Oguntayo",4,1);--- PE
insert into employee (first_name,last_name,role_id, manager_id) values ("Akue", "Omolola",5,2); -- SE
insert into employee(first_name,last_name,role_id,manager_id) values("Ajanakuj","Seun",6,3);-- TL 
insert into employee(first_name,last_name,role_id,manager_id) values("Lekoko","Ope",5,2)-- SE
select * from employee;

