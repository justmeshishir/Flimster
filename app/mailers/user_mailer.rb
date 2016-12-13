class UserMailer < ApplicationMailer
  default from: '"Flimting" <shishirthapa1@gmail.com>'

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.followedMsg.subject
  #
  def followedMsg(user, currentUser)
    @users = user
    @currentUser = currentUser
    mail to: @users.email, subject: "Someone followed you."
  end
end
