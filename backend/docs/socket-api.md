# Информация
1) Порт - 1337

## Исходящее
### Формат: `{action: <String>, payload: ?<JSON>}`
* Если в ответе есть поле error, то показать ошибошку (поле error содержит текст ошибки) и отменить предыдущее действие
* CHAT_CLOSED - собеседник ушел, обрадовать господина
* CHAT_CONNECTED - успешное присоединение к чату, id комнаты, имя собеседника `payload: {uuid: <String>}`
* COMPANION_CONNECTED - с тобой кто-то может поговорить
* ROOM_CREATED - нет чатов общей с тобой направленности, создался новый, ждем собеседника `payload: {uuid: <String>, theme_id: <Number>}`
* NEW_MESSAGE - новое сообщение `payload: {message: <String>}`

## Входящее
### Формат: `{action: <String>, user_data: <JSON>}`
* LEAVE_ROOM - покинуть комнату `user_data: { uuid: <String>}`
* CONNECT - подключиться к комнате `user_data: { theme_id: <Number>}` . Передается id темы, по которой хочется поговорить
* MESSAGE - собственно сообщение `user_data: { message: <String>, uuid: <String>}` . id комнаты
