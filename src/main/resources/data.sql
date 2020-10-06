

insert into user (ID,username,City, Password, firstname,lastname) values (1, 'remi', 'Weert', 'remi','remi','peerlings')

insert into portfolio (ID,NAME, user_id) values (1, 'RemisPorto',1)

insert into stock(id,Description,symbol,name) values (1,'description', 'TSLA', 'Tesla')

insert into position(id, amount,Name, portfolio_id,stock_id, value) values (1,250,'position one', 1,  1,5600)