package model

/*
 * Copyright Medtronic, Inc. 2015
 *
 *  MEDTRONIC CONFIDENTIAL - This document is the property of Medtronic,
 *  Inc.,and must be accounted for. Information herein is confidential. Do
 *  not reproduce it, reveal it to unauthorized persons, or send it outside
 *  Medtronic without proper authorization.
 */
case class Hello (message: String)

object Hello {
  import play.api.libs.json._

  implicit val HelloWrites = new Writes[Hello] {
    def writes(hello: Hello) = Json.obj(
      "message" -> hello.message
    )
  }

  implicit val HelloRead : Reads[Hello]= new Reads[Hello] {
    def reads(json : JsValue): JsResult[Hello] = {
      for (message <- (json \ "message").validate[String]) yield Hello(message)
    }
  }
}
