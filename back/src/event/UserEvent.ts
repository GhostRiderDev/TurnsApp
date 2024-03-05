import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from "typeorm";
import UserEntity from "../entity/UserEntity";
import { transporter } from "../config/mailer";
import { mailPresentation } from "../templates/mailRegister";
import logger from "../utils/logger";
import { EMAIL_USER } from "../config/envs";

@EventSubscriber()
class UserEvent implements EntitySubscriberInterface<UserEntity> {
  listenTo() {
    return UserEntity;
  }
  beforeInsert(event: InsertEvent<UserEntity>) {
    const { username } = event.entity;
    event.entity.username = username.toLowerCase();
  }

  async afterInsert(event: InsertEvent<UserEntity>) {
    try {
      const result = await transporter.sendMail({
        from: EMAIL_USER, // sender address
        to: event.entity.username, // list of receivers
        subject: "Register Success", // Subject line
        text: "Register Success", // plain text body
        html: mailPresentation(),
      });
      logger.info(result.response);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserEvent;

//
