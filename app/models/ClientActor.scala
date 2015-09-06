package models

import akka.actor._

class ClientActor(out: ActorRef, chat: ActorRef) extends Actor {

  chat ! Join

  override def postStop() = chat ! Leave

  def receive = {
    // this handles messages from the websocket
    case text: String =>
      chat ! ClientSentMessage(text)

    case ClientSentMessage(text) =>
      out ! text
  }
}
