const User = require("../models/user");

const shortId = require("short-id");

const jwt = require("jsonwebtoken");

const { errorHandler } = require("../helpers/dbErrorHandler");

const { expressjwt: expressJwt } = require("express-jwt");

const formidable = require("formidable");

// const { Client, LocalAuth } = require("whatsapp-web.js");

const qrcode = require("qrcode-terminal");

const {
  sendEmailForgotPassword,
  sendEmailAccountActivation,
} = require("../helpers/email");

const _ = require("lodash");

// const whatsappClient = new Client({
//   authStrategy: new LocalAuth({ clientId: "session-1" }),
// });

// whatsappClient.on("qr", (qr) => {
//   console.log("QR RECEIVED", qr);
//   qrcode.generate(qr, { small: true });
// });

// whatsappClient.on("authenticated", () => {
//   console.log("Authenticated Client");
// });

// whatsappClient.initialize();

exports.preSignup = (req, res) => {
  const { name, email, password, phone, gender } = req.body;

  User.findOne({ $or: [{ email }, { phone }] }, (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "هذا الحساب مسجل لدينا بالفعل ... جرب تسجيل الدخول",
      });
    }
    const token = jwt.sign(
      { name, email, password, phone, gender },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: "2d",
      }
    );
    return res.json({
      signuplink: `${process.env.CLIENT_URL_PRODUCTION}/auth/account/activate/${token}`,
    });
    //     const emailData = {
    //       from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    //       to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    //       subject: `ادخال البيانات لتفعيل الحساب - ${process.env.APP_NAME}`,
    //       html: `
    //     <h4>لقد تلقيت هذا البريد لانك قمت بالتسجيل في موقع لتسكنوا:</h4>
    //     <p>من فضلك قم بالدخول على هذا الرابط لتقوم بملء استمارتك:</p>
    //     <p>${process.env.CLIENT_URL_PRODUCTION}/auth/account/activate/${token}</p>
    //     <hr />
    //     <p>This email may contain sensitive information</p>
    //     <p>${process.env.CLIENT_URL_PRODUCTION}</p>
    // `,
    //     };
    //     sendEmailAccountActivation(req, res, emailData);
  });
};

exports.signup = (req, res) => {
  const token = req.body.user.token;
  const questionsObject = req.body.questionsList;
  const questionsMap = new Map(Object.entries(questionsObject));
  const idPhoto1 = questionsMap.get("idPhoto1");
  const idPhoto2 = questionsMap.get("idPhoto2");
  const idNumber = questionsMap.get("idNumber");
  questionsMap.delete("idPhoto1");
  questionsMap.delete("idPhoto2");
  questionsMap.delete("idNumber");

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      async function (err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).json({
            error: "هذا الرابط منتهي الصلاحية ... جرب تسجيل حسابك من جديد",
          });
        }

        const { name, email, password, phone, gender } = jwt.decode(token);

        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL_PRODUCTION}/profile/${username}`;

        const user = new User({
          name,
          email,
          password,
          profile,
          username,
          phone,
          gender,
          idPhoto1,
          idPhoto2,
          idNumber,
          questions: questionsMap,
        });

        let existingUser = null;
        //check if this user already exist in db
        if (gender === "man") {
          existingUser = await User.findOne({
            $or: [{ email }, { phone }, { idNumber }],
          });
        } else {
          existingUser = await User.findOne({
            $or: [{ email }, { phone }],
          });
        }

        if (existingUser) {
          return res.status(401).json({
            error: "هناك حساب أخر لديه نفس البيانات ...لا يمكنك التسجيل مرتين",
          });
        }

        user.save((err, user) => {
          if (err) {
            console.log(err);
            return res.status(401).json({
              error: errorHandler(err),
            });
          }

          return res.json({
            message: "لقد قمت بتسجيل بياناتك بنجاح ... قم بتسجيل الدخول الان",
          });
        });
      }
    );
  } else {
    console.log("Here5");
    return res.json({
      message: "حدث خطأ ... جرب مجددا",
    });
  }
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "هذا الحساب غير مسجل لدينا ... جرب تسجيل حسابك أولا",
      });
    }
    //authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "هناك خطأ في كلمة السر أو في البريد الإلكتروني",
      });
    }

    //generate a token and send it to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1y",
    });

    res.cookie("token", token, { expiresIn: "1y" });

    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout success",
  });
};

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  //   userProperty: "auth",
});

exports.authMiddleware = (req, res, next) => {
  const authUserId = req.auth._id;
  User.findById({ _id: authUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.logUserBehavior = (req, res, next) => {
  const authUserId = req.auth._id; // Assuming you are using session-based authentication
  const { method, originalUrl, body } = req;

  const userBehavior = new UserBehavior({
    authUserId,
    action: `${method} ${originalUrl}`,
    data: body,
    timestamp: Date.now(),
  });

  userBehavior
    .save()
    .then(() => {
      console.log(`User behavior logged: ${userBehavior.action}`);
      next();
    })
    .catch((error) => {
      return res.status(400).json({
        error: "Error in saving user behavior",
      });
    });
};

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.auth._id;
  User.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Admin User not found",
      });
    }

    if (user.role === 0) {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }
    req.profile = user;
    next();
  });
};

exports.canUpdateAndDelete = (req, res, next) => {
  const slug = req.params.slug.toLowerCase();
  Blog.findOne({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    let isAuthorizedUser =
      data.postedBy._id.toString() === req.profile._id.toString();

    if (!isAuthorizedUser) {
      return res.status(400).json({
        error: "You are not authorized",
      });
    }
    next();
  });
};

exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res
        .status(401)
        .json({ error: "هذا البريد الالكتروني غير مسجل لدينا" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, {
      expiresIn: "2d",
    });
    //email
    const emailData = {
      from: process.env.EMAIL_FROM, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
      to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
      subject: `رابط استعادة كلمة السر - ${process.env.APP_NAME}`,
      html: `
          <h4>لقد تلقيت هذا البريد من موقع لتسكنوا:</h4>
          <p>استعمل هذا الرابط لتعيين كلمة سر جديدة :</p>
          <p>${process.env.CLIENT_URL_PRODUCTION}/auth/password/reset/${token}</p>
          <hr />
          <p>هذا الرابط صالح لمدة محدودة فقط</p>
          <p>This email may contain sensitive information</p>
          <p>https://letaskono.vercel.app</p>
      `,
    };

    //populate db with user > resetPasswordLink
    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.json({ error: errorHandler(err) });
      } else {
        sendEmailForgotPassword(req, res, emailData);
      }
    });
  });
};

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  if (resetPasswordLink) {
    jwt.verify(
      resetPasswordLink,
      process.env.JWT_RESET_PASSWORD,
      function (err, decoded) {
        if (err) {
          return res.status(401).json({
            error: "Expired link ... try again",
          });
        }
        User.findOne({ resetPasswordLink }, (error, user) => {
          if (err || !user) {
            return res.status(401).json({
              error: user,
            });
          }

          const updatedFields = {
            password: newPassword,
            resetPasswordLink: "",
          };
          user = _.extend(user, updatedFields);

          user.save((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            }
            res.json({
              message: "لقد قمت بتعيين كلمة سر جديدة بنجاح",
            });
          });
        });
      }
    );
  }
};
