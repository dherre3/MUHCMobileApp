var exports=module.exports={};

exports.patientQuery=function(userID)
{
  return 'SELECT ' +
                      'Patient.PatientSerNum,' +
                      'Patient.FirstName, ' +
                      'Patient.LastName,' +
                      'Patient.TelNum,' +
                      'Patient.Email,' +
                      'Patient.Language,' +
                      'Patient.EnableSMS,' +
                      'Patient.ProfileImage ' +
                    'From ' +
                      'Patient, '+
                      'Users ' +
                    'WHERE '+
                      'Users.Username LIKE '+"\'"+ userID+"\'"+'AND Users.UserTypeSerNum = Patient.PatientSerNum';
}
exports.patientDoctorsQuery=function(userID)
{
  return 'SELECT '+
                      'Doctor.FirstName, '+
                      'Doctor.LastName, '+
                      'Doctor.DoctorSerNum, '+
                      'PatientDoctor.PrimaryFlag, '+
                      'PatientDoctor.OncologistFlag, '+
                      'Doctor.Email, '+
                      'Doctor.Phone, '+
                      'Doctor.ProfileImage, ' +
                      'Doctor.Address '+
                      'FROM '+
                        'Doctor, '+
                        'PatientDoctor, '+
                        'Patient, '+
                        'Users ' +
                      'WHERE '+
                        'Users.Username Like '+ "'" + userID +"'" +
                       ' AND '+
                       'Patient.PatientSerNum=Users.UserTypeSerNum AND '+
                        'PatientDoctor.PatientSerNum = Patient.PatientSerNum AND '+
                        'Doctor.DoctorSerNum = PatientDoctor.DoctorSerNum';
}

exports.patientDiagnosesQuery=function(userID)
{
  return 'SELECT '+
                      'Diagnosis.Description_EN, '+
                      'Diagnosis.Description_FR '+
                      'FROM '+
                        'Diagnosis, '+
                        'Patient, '+
                        'Users ' +
                      'WHERE '+
                        'Users.Username Like '+ "'" + userID +"'" +
                       ' AND '+
                       'Users.UserTypeSerNum=Patient.PatientSerNum AND '+
                        'Diagnosis.PatientSerNum = Patient.PatientSerNum';
}

exports.patientMessagesQuery=function(userID)
{
  return 'SELECT '+
                      'Messages.MessageSerNum, '+
                      'Messages.SenderRole, '+
                      'Messages.ReceiverRole, '+
                      'Messages.SenderSerNum, '+
                      'Messages.ReceiverSerNum, '+
                      'Messages.MessageContent, '+
                      'Messages.ReadStatus, '+
                      'Messages.MessageDate '+
                      'FROM '+
                        'Messages, '+
                        'Patient, '+
                        'Users ' +
                      'WHERE '+
                        '(Users.Username Like '+ "'" + userID +"' )" +
                       ' AND '+
                       'Patient.PatientSerNum=Users.UserTypeSerNum AND' +
                        "( (messages.ReceiverRole='Patient' AND patient.PatientSerNum = messages.ReceiverSerNum) OR (messages.SenderRole='Patient' AND patient.PatientSerNum = messages.SenderSerNum) )";
}

exports.patientAppointmentsQuery=function(userID)
{
  return 'SELECT '+
                      'Alias.AliasName_EN AS AppointmentType_EN, '+
                      'Alias.AliasName_FR AS AppointmentType_FR, '+
                      'Alias.AliasDescription_EN AS AppointmentDescription_EN, '+
                      'Alias.AliasDescription_FR AS AppointmentDescription_FR, '+
                      'Appointments.ScheduledStartTime, '+
                      'Appointments.AppointmentSerNum, '+
                      'Appointments.ScheduledEndTime, '+
                      'Appointments.Location, '+
                      'Appointments.Checkin, '+
                      'Appointments.ChangeRequest, '+
                      'Resource.ResourceName '+
                    'From '+
                      'Appointments, '+
                      'AliasExpression, '+
                      'Alias, ' +
                      'Resource, '+
                      'Patient, '+
                      'Users ' +
                    'WHERE '+
                      'Resource.ResourceSerNum = Appointments.ResourceSerNum AND '+
                      'Patient.PatientSerNum = Appointments.PatientSerNum AND '+
                      'AliasExpression.AliasExpressionSerNum=Appointments.AliasExpressionSerNum AND '+
                      'AliasExpression.AliasSerNum=Alias.AliasSerNum AND '+
                      'Users.UserTypeSerNum=Patient.PatientSerNum AND '+
                      'Users.Username Like '+"'"+ userID+"'";
}

exports.patientDocumentsQuery=function(userID)
{
  return 'SELECT '+
                      'Documents.FinalFileName, '+
                      'Alias.AliasName_EN, ' +
                      'Alias.AliasName_FR, '+
                      'Alias.AliasDescription_EN, '+
                      'Alias.AliasDescription_FR, '+
                      'Documents.DocumentSerNum, ' +
                      'Documents.DateAdded ' +
                    'From '+
                      'Documents,'+
                      'Patient, '+
                      'Alias, '+
                      'AliasExpression, ' +
                      'Users ' +

                    'WHERE '+
                      'Documents.AliasExpressionSerNum = AliasExpression.AliasExpressionSerNum AND '+
                      'AliasExpression.AliasSerNum = Alias.AliasSerNum AND '+
                      'Patient.PatientSerNum = Documents.PatientSerNum AND '+
                      'Users.UserTypeSerNum=Patient.PatientSerNum AND '+
                      'Users.Username Like '+"'"+ userID+"'";

}
exports.patientNotificationsQuery=function(userID)
{
  return 'SELECT '+
                      'Notifications.NotificationSerNum, '+
                      'Notifications.Type, '+
                      'Notifications.TypeSerNum, '+
                      'Notifications.NotificationPublishedType_FR, '+
                      'Notifications.NotificationPublishedType_EN, '+
                      'Notifications.NotificationContent_FR, '+
                      'Notifications.NotificationContent_EN, '+
                      'Notifications.ReadStatus, '+
                      'Notifications.DateAdded, '+
                      'Resource.ResourceName '+
                    'From '+
                      'Notifications, '+
                      'Patient, '+
                      'Resource, '+
                      'Users ' +
                    'WHERE '+
                      'Patient.PatientSerNum = Notifications.PatientSerNum AND '+
                      'Resource.ResourceSerNum = Notifications.ResourceSerNum AND ' +
                      'Users.UserTypeSerNum=Patient.PatientSerNum AND '+
                      'Users.Username Like '+"'"+ userID+"'";
}
//To be decided!!!!!
exports.notesQuery=function(userID)
{
  return 'SELECT '+
                  'patientnotes.NoteSerNum, '+
                  'patientnotes.Title, '+
                  'patientnotes.Content, '+
                  'patientnotes.DateAdded '+
                'From '+
                  'patientnotes, '+
                  'patient '+
                'WHERE '+
                  'patient.PatientSerNum = patientnotes.PatientSerNum AND '+
                  'patient.LoginID Like '+"\'"+ userID+"\'";
}


exports.patientTasksQuery=function(userID)
{
  return 'SELECT '+
             'AliasExpression.ExpressionName AS TasksName, '+
             'Tasks.DueDateTime '+
           'From '+
             'Tasks, '+
             'AliasExpression, '+
             'Patient, '+
             'Users '+
           'WHERE '+
             'Patient.PatientSerNum = Tasks.PatientSerNum AND ' +
             'AliasExpression.AliasExpressionSerNum = Tasks.AliasExpressionSerNum AND '+
             'Users.UserTypeSerNum=Patient.PatientSerNum AND '+
             'Users.Username Like '+"'"+ userID+"'";
}
exports.readMessage=function(MessageSerNum)
{
  return "UPDATE `Messages` SET ReadStatus=1 WHERE Messages.MessageSerNum='"+MessageSerNum+"'";
}
exports.checkin=function(AppointmentSerNum)
{
  return "UPDATE Appointments SET Checkin=1 WHERE Appointments.Checkin=0 AND Appointments.AppointmentSerNum='"+AppointmentSerNum+"'";
}
exports.readNotification=function(NotificationSerNum)
{
  return "UPDATE Notifications SET ReadStatus=1 WHERE `Notifications`.`NotificationSerNum`='"+NotificationSerNum+"'";
}
exports.accountChange=function( serNum, field, newValue)
{
  return "UPDATE Patient SET "+field+"='"+newValue+"' WHERE PatientSerNum LIKE '"+serNum+"'";
}
exports.inputFeedback=function(UserSerNum, content)
{
  return "INSERT INTO Feedback (`FeedbackSerNum`,`UserSerNum`,`FeedbackContent`,`LastUpdated`) VALUES (NULL,'"+UserSerNum+"','"+ content + "',"+"CURRENT_TIMESTAMP )";
}
exports.sendMessage=function(objectRequest)
{
  objectRequest=objectRequest.Parameters;
  var senderRole=objectRequest.SenderRole;
  var receiverRole=objectRequest.ReceiverRole;
  var senderSerNum=objectRequest.SenderSerNum;
  var receiverSerNum=objectRequest.ReceiverSerNum;
  var messageContent=objectRequest.MessageContent;
  var messageDate=objectRequest.MessageDate;
  console.log("INSERT INTO Messages (`MessageSerNum`, `SenderRole`,`ReceiverRole`, `SenderSerNum`, `ReceiverSerNum`,`MessageContent`,`ReadStatus`,`MessageDate`,`LastUpdated`) VALUES (NULL,'"+senderRole+"','"+ receiverRole + "', '"+senderSerNum+"','"+ receiverSerNum +"','" +messageContent+"',0,'"+messageDate+"' ,CURRENT_TIMESTAMP )");
  return "INSERT INTO Messages (`MessageSerNum`, `SenderRole`,`ReceiverRole`, `SenderSerNum`, `ReceiverSerNum`,`MessageContent`,`ReadStatus`,`MessageDate`,`LastUpdated`) VALUES (NULL,'"+senderRole+"','"+ receiverRole + "', '"+senderSerNum+"','"+ receiverSerNum +"','" +messageContent+"',0,'"+messageDate+"' ,CURRENT_TIMESTAMP )";
}
exports.getPatientFromUserId=function(userID)
{
  return "SELECT UserTypeSerNum, UserSerNum FROM Users WHERE Username LIKE"+"\'"+ userID+"\'"+" AND UserType LIKE 'Patient'";
}
exports.logActivity=function(UserSerNum, request)
{
  return "INSERT INTO patientactivitylog (`ActivitySerNum`,`UserSerNum`, `ActivityType`,`ActivityDescription` ,`ActivityDateTime`,`LastUpdated`) VALUES (NULL,'"+UserSerNum+ "', '"+request+"','no description',CURRENT_TIMESTAMP ,CURRENT_TIMESTAMP )";
}
