

insert into user (ID,username,City, Password, firstname,lastname) values (1, 'remi', 'Weert', 'remi','remi','peerlings')

insert into portfolio (ID,NAME, user_id) values (1, 'RemisPorto',1)

insert into stock(id,Description,symbol,name, latest_price) values (1,'description', 'TSLA', 'Tesla', 420)

insert into position(id, amount,Name, portfolio_id,stock_id, value) values (1,100,'position one', 1,  1,42000)