USE [master]
GO
/****** Object:  Database [SignalRChat]    Script Date: 2/5/2024 10:39:21 AM ******/
CREATE DATABASE [SignalRChat]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'SignalRChat', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SignalRChat.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'SignalRChat_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\SignalRChat_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [SignalRChat] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [SignalRChat].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [SignalRChat] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [SignalRChat] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [SignalRChat] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [SignalRChat] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [SignalRChat] SET ARITHABORT OFF 
GO
ALTER DATABASE [SignalRChat] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [SignalRChat] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [SignalRChat] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [SignalRChat] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [SignalRChat] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [SignalRChat] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [SignalRChat] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [SignalRChat] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [SignalRChat] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [SignalRChat] SET  ENABLE_BROKER 
GO
ALTER DATABASE [SignalRChat] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [SignalRChat] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [SignalRChat] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [SignalRChat] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [SignalRChat] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [SignalRChat] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [SignalRChat] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [SignalRChat] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [SignalRChat] SET  MULTI_USER 
GO
ALTER DATABASE [SignalRChat] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [SignalRChat] SET DB_CHAINING OFF 
GO
ALTER DATABASE [SignalRChat] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [SignalRChat] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [SignalRChat] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [SignalRChat] SET QUERY_STORE = OFF
GO
USE [SignalRChat]
GO
/****** Object:  Table [dbo].[GroupChatMessages]    Script Date: 2/5/2024 10:39:21 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GroupChatMessages](
	[MessageID] [int] IDENTITY(1,1) NOT NULL,
	[FromUserId] [varchar](200) NULL,
	[Message] [nvarchar](max) NULL,
	[IsDeleted] [bit] NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[MessageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonalChatMessages]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonalChatMessages](
	[MessageId] [int] NOT NULL,
	[FromUserId] [varchar](200) NULL,
	[ToUserId] [varchar](200) NULL,
	[Message] [nvarchar](max) NULL,
	[IsDeleted] [bit] NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[MessageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [varchar](200) NULL,
	[EmailID] [varchar](200) NULL,
	[Password] [varchar](200) NULL,
	[ChatUserId] [nvarchar](max) NULL,
	[ChatConnectionID] [nvarchar](max) NULL,
	[PeerUserId] [nvarchar](max) NULL,
	[PeerConnectionId] [nvarchar](max) NULL,
	[JWTToken] [nvarchar](max) NULL,
	[TokenCreatedDate] [datetime] NULL,
	[IsDeleted] [bit] NULL,
	[IsOnline] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[GroupChatMessages] ON 

INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (1, N'1', N'Hii', 0, CAST(N'2024-02-02T10:41:54.240' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (2, N'2', N'Hii', 0, CAST(N'2024-02-02T10:43:43.813' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (3, N'3', N'Hello', 0, CAST(N'2024-02-02T10:46:07.750' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (4, N'2', N'Yup', 0, CAST(N'2024-02-02T11:42:41.197' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (5, N'3', N'dsx cdxc', 0, CAST(N'2024-02-02T12:13:43.200' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (6, N'2', N'Heelo I am vatsal', 0, CAST(N'2024-02-02T12:14:48.320' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (7, N'3', N'Hii i am mayank', 0, CAST(N'2024-02-02T12:15:13.467' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (8, N'2', N'How are you??', 0, CAST(N'2024-02-02T12:17:51.600' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (9, N'2', N'hiiiii', 0, CAST(N'2024-02-02T12:47:01.980' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (10, N'3', N'Working', 0, CAST(N'2024-02-02T12:47:08.997' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (11, N'2', N'hiiii', 0, CAST(N'2024-02-02T12:47:23.170' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (12, N'3', N'sdfcdvxdsv', 0, CAST(N'2024-02-02T12:47:26.420' AS DateTime))
INSERT [dbo].[GroupChatMessages] ([MessageID], [FromUserId], [Message], [IsDeleted], [CreatedDate]) VALUES (13, N'1003', N'hii i am tarang', 0, CAST(N'2024-02-02T13:16:36.343' AS DateTime))
SET IDENTITY_INSERT [dbo].[GroupChatMessages] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [UserName], [EmailID], [Password], [ChatUserId], [ChatConnectionID], [PeerUserId], [PeerConnectionId], [JWTToken], [TokenCreatedDate], [IsDeleted], [IsOnline]) VALUES (2, N'Vatsal Prajapati', N'vatsalprajapati@gmail.com', N'Vatsal@123', NULL, N'5sAuvsf6OxJg3FBRgW-_YA', N'dc95e99b-e87f-4aec-8043-d5aea38753ce', NULL, N'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IntcIlVzZXJJZFwiOjIsXCJFbWFpbElEXCI6XCJ2YXRzYWxwcmFqYXBhdGlAZ21haWwuY29tXCIsXCJGdWxsTmFtZVwiOm51bGwsXCJUb2tlblZhbGlkVG9cIjpcIjAwMDEtMDEtMDFUMDA6MDA6MDBcIixcIlVzZXJOYW1lXCI6bnVsbH0iLCJuYmYiOjE3MDY3OTIzMTEsImV4cCI6MTcwNzM5NzExMSwiaWF0IjoxNzA2NzkyMzExfQ.yyAw1KU1Lndj7-8ib9chvDFzG2VS--XU75WG4Lx-e3SmENhrl6y78QA5Lmf4qBSQPbLKayML5zZxifRgOPFZEQ', CAST(N'2024-02-01T12:58:31.050' AS DateTime), 0, 1)
INSERT [dbo].[Users] ([UserID], [UserName], [EmailID], [Password], [ChatUserId], [ChatConnectionID], [PeerUserId], [PeerConnectionId], [JWTToken], [TokenCreatedDate], [IsDeleted], [IsOnline]) VALUES (3, N'Mayank Sharma', N'mayank.p@gmail.com', N'Mayank@123', NULL, N'yRqtlmoMxirhpqTGEajt2A', N'ca54157f-17a7-4506-9570-42ed88d3a14f', NULL, N'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IntcIlVzZXJJZFwiOjMsXCJFbWFpbElEXCI6XCJtYXlhbmsucEBnbWFpbC5jb21cIixcIkZ1bGxOYW1lXCI6bnVsbCxcIlRva2VuVmFsaWRUb1wiOlwiMDAwMS0wMS0wMVQwMDowMDowMFwiLFwiVXNlck5hbWVcIjpudWxsfSIsIm5iZiI6MTcwNjc4OTQ4MiwiZXhwIjoxNzA3Mzk0MjgyLCJpYXQiOjE3MDY3ODk0ODJ9.-GPIc028Q56J6yIp-g6BR1G-fppiEfmG3iKL5uR50fWArmQnaDjEHOJo6DyBY-81S31vpxPio8uFGQGdvkDIKQ', CAST(N'2024-02-01T12:11:22.373' AS DateTime), 0, 1)
INSERT [dbo].[Users] ([UserID], [UserName], [EmailID], [Password], [ChatUserId], [ChatConnectionID], [PeerUserId], [PeerConnectionId], [JWTToken], [TokenCreatedDate], [IsDeleted], [IsOnline]) VALUES (1003, N'Tarang Patel', N'tarang.l@gmail.com', N'Tarang@123', NULL, N'0jE8XEQvIDvxb1GBmivmPg', N'1dec3fb2-b55a-410c-9a28-6b3be4b490ad', NULL, N'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IntcIlVzZXJJZFwiOjEwMDMsXCJFbWFpbElEXCI6XCJ0YXJhbmcubEBnbWFpbC5jb21cIixcIkZ1bGxOYW1lXCI6bnVsbCxcIlRva2VuVmFsaWRUb1wiOlwiMDAwMS0wMS0wMVQwMDowMDowMFwiLFwiVXNlck5hbWVcIjpudWxsfSIsIm5iZiI6MTcwNjg3OTY2OSwiZXhwIjoxNzA3NDg0NDY5LCJpYXQiOjE3MDY4Nzk2Njl9.yKNqXBEveq_AeEWy6Z7InzgBXTyTT3op3rzXQ4W1yhxlzg8RboV0KRv8MKb9A9vBy4ml8FqDqfQ2XM2kd0Hbow', CAST(N'2024-02-02T13:14:29.503' AS DateTime), 0, 1)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[GroupChatMessages] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[GroupChatMessages] ADD  DEFAULT (getutcdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[PersonalChatMessages] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO
ALTER TABLE [dbo].[Users] ADD  DEFAULT ((0)) FOR [IsOnline]
GO
/****** Object:  StoredProcedure [dbo].[sp_GetGroupChat]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetGroupChat]
AS
BEGIN
	select u.UserID, u.ChatConnectionID, u.EmailID,u.UserName, g.Message from Users u
	inner join GroupChatMessages g
	on u.UserID = g.FromUserId ORDER BY g.CreatedDate ASC
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetOnlineUserList]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetOnlineUserList]
AS
BEGIN
	SELECT UserID, UserName, EmailID, ChatUserId, ChatConnectionID, PeerUserId, PeerConnectionId FROM Users WHERE IsOnline = 1
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserById]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_GetUserById](
	@UserId INT
)
AS
BEGIN
	SELECT UserID, UserName, EmailID, ChatUserId, ChatConnectionID, PeerUserId, PeerConnectionId FROM Users WHERE UserID = @UserId
END
GO
/****** Object:  StoredProcedure [dbo].[sp_GetUserList]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_GetUserList]
AS
BEGIN
	SELECT UserID, UserName, EmailID, ChatUserId, ChatConnectionID, PeerUserId, PeerConnectionId FROM Users WHERE IsDeleted = 0
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SaveGroupChat]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SaveGroupChat](
	@FromUserId int,
	@Message NVARCHAR(MAX)
)
AS
BEGIN
	INSERT INTO GroupChatMessages (FromUserId, Message) VALUES (@FromUserId, @Message)

	select u.UserID, u.ChatConnectionID, u.EmailID,u.UserName, g.Message from Users u
	inner join GroupChatMessages g
	on u.UserID = g.FromUserId ORDER BY g.CreatedDate ASC
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SavePeer]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SavePeer](
	@PeerId nvarchar(max),
	@UserId int
)
as
begin
	update Users SET PeerUserId = @PeerId WHERE UserID = @UserId
	select 1 as 'IsSuccess', 'Peer saved successfully' as 'Result'
end
GO
/****** Object:  StoredProcedure [dbo].[sp_SetStatusOffline]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_SetStatusOffline](
	@UserEmail VARCHAR(200)
)
AS
BEGIN
	UPDATE Users SET IsOnline = 0 WHERE EmailID = @UserEmail
END
GO
/****** Object:  StoredProcedure [dbo].[sp_SetStatusOnline]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_SetStatusOnline](
	@UserEmail VARCHAR(200)
)
AS
BEGIN
	UPDATE Users SET IsOnline = 1 WHERE EmailID = @UserEmail
END
GO
/****** Object:  StoredProcedure [dbo].[sp_UpdateConnection]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_UpdateConnection](
	@UserEmail VARCHAR(200),
	@ConnectionId NVARCHAR(MAX)
)
AS
BEGIN
	UPDATE Users SET ChatConnectionID = @ConnectionId WHERE EmailID = @UserEmail
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateLoginToken]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_UpdateLoginToken]    
@UserId bigint ,
@Token nvarchar(max)
AS    
BEGIN    
     UPDATE Users    
       SET    JWTToken = @Token,   
           TokenCreatedDate =GETUTCDATE()    
         WHERE  UserId = @UserId 
     SELECT 1   
END  
GO
/****** Object:  StoredProcedure [dbo].[sp_VerifyLogin]    Script Date: 2/5/2024 10:39:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[sp_VerifyLogin](
	@EmailID varchar(200),
	@Password varchar(200)
)
AS
BEGIN
	update Users set IsOnline = 1 WHERE EmailID = @EmailID
	SELECT UserId,EmailID, Password FROM Users WHERE EmailID = @EmailID AND Password = @Password
END
GO
USE [master]
GO
ALTER DATABASE [SignalRChat] SET  READ_WRITE 
GO
