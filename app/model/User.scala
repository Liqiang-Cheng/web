package model

/*
 * Copyright Medtronic, Inc. 2015
 *
 *  MEDTRONIC CONFIDENTIAL - This document is the property of Medtronic,
 *  Inc.,and must be accounted for. Information herein is confidential. Do
 *  not reproduce it, reveal it to unauthorized persons, or send it outside
 *  Medtronic without proper authorization.
 */
case class User(userName: String, password: String)

object User {
  import play.api.libs.json._

  var users: List[User] = Nil

  implicit val AddUser = {
    user: User =>
      users = users.::(user)
  }

  implicit val UserWrites = new Writes[User] {
    def writes(user: User) = Json.obj(
      "userName" -> user.userName
    )
  }

  implicit val UserReads : Reads[User]= new Reads[User] {
    def reads(json : JsValue): JsResult[User] = {
      for (userName <- (json \ "userName").validate[String];
           password <- (json \ "password").validate[String]) yield User(userName,password)
    }
  }
}
