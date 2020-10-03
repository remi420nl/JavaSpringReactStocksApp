insert into user (ID,username,City, Password) values (1, 'remi', 'Weert', 'remi')

insert into portfolio (ID,NAME,user_id) values (1, 'RemisPorto',1)

insert into stock(id,Description,name) values (1, 'description', 'TSLA')

insert into position(id, amount,Name, portfolio_id,stock_id) values (1,250,'position one', 1,  1)