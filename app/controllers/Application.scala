package controllers

import model.Hello
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index.render())
  }

  def hello = Action {
    val h = Hello("Eric Cheng")
    val json = Json.toJson(h)
    Ok(json)
  }

  def helloBack = Action {
      request =>
        request.body.asJson.map {
          json => {
            println(json)
            json.validate[Hello].map{
              case (hello) => Ok(hello.message)
            }.recoverTotal{
              println("Json not validate")
              e => BadRequest("Json parse failed Bad request")
            }
          }
        }.getOrElse {
          println("request body is not json")
          BadRequest("Json failed Bad request")
        }
  }
}