name := """webApp"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.1"

libraryDependencies ++= Seq(
  "com.h2database" % "h2" % "1.4.182",
  "org.webjars" % "bootstrap" % "3.3.1",
  "org.webjars" % "react" % "0.13.3",
  "org.mockito" % "mockito-core" % "1.10.17" % "test"
)
