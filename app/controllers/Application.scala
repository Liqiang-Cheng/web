package controllers

import model.Hello
import play.api.mvc._
import play.api.libs.json._

object Application extends Controller {

  def index = Action {
    Ok(views.html.index.render())
  }

  def hello = Action {
    val h = Hello("Liqiang Cheng")
    println(h)
    val json = Json.toJson(h)
    println(json)
    Ok(json)
  }

  def helloBack = Action {
      request =>
        request.body.asJson.map { json =>
          json.validate[Hello].map{
            case (hello) => Ok(hello.message)
          }.recoverTotal{
            e => BadRequest("Bad request")
          }
        }.getOrElse {
          BadRequest("Bad request")
        }
  }
}