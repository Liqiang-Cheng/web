package controllers

import model.{User, Hello}
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

  def helloBack = {
    requestHandler[Hello](
      json => json.validate[Hello],
      hello => Ok(hello.message)
    )
  }

  def loginUser = {
    requestHandler[User](
      json => json.validate[User],
      user => {
        if (User.users.contains(user))
          Ok("Success")
        else
          Ok("Failed")
      }
    )
  }

  def createUser = {
    requestHandler[User](
    json => json.validate[User],
    user => {val newUser = User(user.userName, user.password)
      User.AddUser(newUser)
      Ok("Success")})
  }

  private def requestHandler[A](f: JsValue => JsResult[A], h: A => Result) = Action {
    request =>
      request.body.asJson.map {
        json => {
          f(json).map {
            case (input) => h(input)
          }.recoverTotal {
            e => BadRequest("Parse failed")
          }
        }
      }.getOrElse {
        BadRequest("Request body is not json format")
      }
  }
}