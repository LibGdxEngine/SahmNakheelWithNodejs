import { useState, useEffect } from "react";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, update, getQuestions } from "../../actions/user";
import classes from "../../components/user/userProfile.module.css";
import { COUNTRIES, STATES } from "../../constants";
import { toast } from "react-toastify";
const ProfileUpdateQuestions = (props) => {
  const [questions, setQuestions] = useState();
  const [userAnswers, setUserAnswers] = useState();
  const token = getCookie("token");
  const [user, setUser] = useState();

  const [values, setValues] = useState({
    error: false,
    success: false,
    loading: false,
  });

  const { error, success, loading } = values;

  const handleChange = (questionId) => (e) => {
    // if (e.target.value.trim() === "") {
    //   toast.error("لا يمكنك تعديل اجابتك لتكون فارغة");
    //   return;
    // }
    setUserAnswers({ ...userAnswers, [questionId]: e.target.value });
  };

  const showMenQuestionsForm = () => {
    if (userAnswers) {
      return (
        <div className={classes["questionsContainer"]}>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الحالة الاجتماعية*</label>
            <select
              name="generalStatus"
              value={userAnswers[0]}
              onChange={handleChange(0)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر حالتك</option>
              <option value="أعزب">أعزب</option>
              <option value="متزوج">متزوج</option>
              <option value="مطلق">مطلق</option>
              <option value="أرمل">أرمل</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>أين تعيش حاليا*</label>
            <select
              name="country"
              value={userAnswers[1]}
              onChange={handleChange(1)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="" disabled hidden className="!text-primary">
                اختر بلد الإقامة
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الجنسية*</label>
            <select
              name="nationality"
              value={userAnswers[36]}
              onChange={handleChange(36)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="" disabled hidden className="!text-primary">
                اختر الجنسية
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>المؤهل أو الشهادة*</label>
            <select
              name="certificate"
              value={userAnswers[9]}
              onChange={handleChange(9)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر مؤهلك</option>
              <option value="الشهادة الابتدائية">الشهادة الابتدائية</option>
              <option value="الشهادة الاعدادية">الشهادة الاعدادية</option>
              <option value="الشهادة الثانوية">الشهادة الثانوية</option>
              <option value="دبلوم">دبلوم</option>
              <option value="الجامعية الجامعية">الشهادة الجامعية</option>
              <option value="ماجستير">دراسات عليا - ماجستير</option>
              <option value="دكتوراة">دراسات عليا - دكتوراة</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الوظيفة*</label>
            <input
              type="text"
              name="job"
              value={userAnswers[8]}
              onChange={handleChange(8)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            {
              <>
                <label className={classes.inputLabel}>
                  المحافظة أو المدينة التي تعيش بها*
                </label>
                <select
                  name="state"
                  value={userAnswers[16]}
                  onChange={handleChange(16)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر محافظتك</option>
                  {STATES[userAnswers[1]].map((state) => {
                    return <option value={state}>{state}</option>;
                  })}
                </select>
              </>
            }
          </div>
          {userAnswers[0] !== "أعزب" && (
            <>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد أولادك الذكور*</label>
                <select
                  name="maleChilds"
                  value={userAnswers[2]}
                  onChange={handleChange(2)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد بناتك*</label>
                <select
                  name="femaleChilds"
                  value={userAnswers[3]}
                  onChange={handleChange(3)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
            </>
          )}
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>العمر*</label>
            <input
              type="Number"
              name="age"
              value={userAnswers[6]}
              onChange={handleChange(6)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الطول*</label>
            <input
              type="Number"
              name="height"
              value={userAnswers[4]}
              onChange={handleChange(4)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الوزن*</label>
            <input
              type="Number"
              name="weight"
              value={userAnswers[5]}
              onChange={handleChange(5)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>لون البشرة*</label>
            <select
              name="skinColor"
              value={userAnswers[7]}
              onChange={handleChange(7)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="بيضاء جدا">بيضاء جدا</option>
              <option value="بيضاء">بيضاء</option>
              <option value="متوسطة">متوسطة</option>
              <option value="قمحية">قمحية</option>
              <option value="داكنة">داكنة</option>
              <option value="داكنة جدا">داكنة</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما مدى التزامك بالصلاة؟*
            </label>
            <select
              name="pary"
              value={userAnswers[13]}
              onChange={handleChange(13)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="أصلي جميع الصلوات في وقتها في المسجد">
                أصلي جميع الصلوات في وقتها في المسجد
              </option>
              <option value="أصلي جميع الصلوات في وقتها في البيت">
                أصلي جميع الصلوات في وقتها في البيت
              </option>
              <option value="أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها">
                أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها
              </option>
              <option value="متقطع في الصلاة">متقطع في الصلاة</option>
              <option value="لا أصلي">لا أصلي معظم الوقت</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل أنت ملتحي؟*</label>
            <select
              name="le7ya"
              value={userAnswers[23]}
              onChange={handleChange(23)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="ملتحي">ملتحي</option>
              <option value="لحية خفيفة">لحية خفيفة</option>
              <option value="حليق">أملس</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              عدد الأجزاء التي تحفظها من القرآن*
            </label>
            <select
              name="quran"
              value={userAnswers[18]}
              onChange={handleChange(18)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="جزء واحد">جزء واحد - 1</option>
              <option value="جزءان">جزءان - 2</option>
              <option value="ثلاثة أجزاء">ثلاثة أجزاء - 3</option>
              <option value="أربعة أجزاء">أربعة أجزاء - 4</option>
              <option value="خمسة أجزاء">خمسة أجزاء - 5</option>
              <option value="ستة أجزاء">ستة أجزاء - 6</option>
              <option value="سبعة أجزاء">سبعة أجزاء - 7</option>
              <option value="ثمانية أجزاء">ثمانية أجزاء - 8</option>
              <option value="تسعة أجزاء">تسعة أجزاء - 9</option>
              <option value="عشرة أجزاء">عشرة أجزاء - 10</option>
              <option value="أحد عشر جزءا">أحد عشر جزءا - 11</option>
              <option value="اثنا عشر جزءا">اثنا عشر جزءا - 12</option>
              <option value="ثلاثة عشر جزءا">ثلاثة عشر جزءا - 13</option>
              <option value="أربعة عشر جزءا">أربعة عشر جزءا - 14</option>
              <option value="خمسة عشر جزءا">خمسة عشر جزءا - 15</option>
              <option value="ستة عشر جزءا">ستة عشر جزءا - 16</option>
              <option value="سبعة عشر جزءا">سبعة عشر جزءا - 17</option>
              <option value="ثمانية عشر جزءا">ثمانية عشر جزءا - 18</option>
              <option value="تسعة عشر جزءا">تسعة عشر جزءا - 19</option>
              <option value="عشرون جزءا">عشرون جزءا - 20</option>
              <option value="واحد وعشرون جزءا">واحد وعشرون جزءا - 21</option>
              <option value="ثنان وعشرون جزءا">اثنان وعشرون جزءا - 22</option>
              <option value="ثلاثة وعشرون جزءا">ثلاثة وعشرون جزءا - 23</option>
              <option value="أربعة وعشرون جزءا">أربعة وعشرون جزءا - 24</option>
              <option value="خمسة وعشرون جزءا">خمسة وعشرون جزءا - 25</option>
              <option value="ستة وعشرون جزءا">ستة وعشرون جزءا - 26</option>
              <option value="سبعة وعشرون جزءا">سبعة وعشرون جزءا - 27</option>
              <option value="ثمانية وعشرون جزءا">
                ثمانية وعشرون جزءا - 28
              </option>
              <option value="تسعة وعشرون جزءا">تسعة وعشرون جزءا - 29</option>
              <option value="ختمت القرآن">ختمت القرآن - 30</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              أخبرنا عن نفسك أو بما يقوله الناس عنك*
            </label>
            <textarea
              type="text"
              name="aboutYou"
              value={userAnswers[10]}
              onChange={handleChange(10)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما هي المواصفات التي تريدها في زوجتك*
            </label>
            <textarea
              type="text"
              name="aboutYourPartner"
              value={userAnswers[11]}
              onChange={handleChange(11)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              من هم شيوخك الذين تأخذ العلم عنهم
            </label>
            <textarea
              type="text"
              name="yourShiekh"
              value={userAnswers[24]}
              onChange={handleChange(24)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما مفهومك عن القوامة</label>
            <textarea
              type="text"
              name="qwamaUnderstanding"
              value={userAnswers[25]}
              onChange={handleChange(25)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>أين تعمل تحديدا؟</label>
            <textarea
              type="text"
              name="whereDoYouWord"
              value={userAnswers[26]}
              onChange={handleChange(26)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تعاني من الخوف المفرط من بعض الأشياء ؟
            </label>
            <textarea
              type="text"
              name="anyPhobia"
              value={userAnswers[27]}
              onChange={handleChange(27)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
          {/* ------------------------------------ */}
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل العمل الذي تعمل فيه حلال؟
            </label>
            <textarea
              type="text"
              name="youJobIsHalal"
              value={userAnswers[28]}
              onChange={handleChange(28)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل أنت على دراية بضوابط الخطبة الشرعية ومستعد للالتزام بها؟
            </label>
            <textarea
              type="text"
              name="dawabet"
              value={userAnswers[29]}
              onChange={handleChange(29)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو هدفك في الحياة</label>
            <textarea
              type="text"
              name="yourLifeGoal"
              value={userAnswers[30]}
              onChange={handleChange(30)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل لك نصيب من طلب العلم الشرعي ؟
            </label>
            <textarea
              type="text"
              name="learningDeen"
              value={userAnswers[31]}
              onChange={handleChange(31)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تحافظ على أذكار الصباح والمساء ؟
            </label>
            <textarea
              type="text"
              name="azkar"
              value={userAnswers[32]}
              onChange={handleChange(32)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما مفهومك عن النجاح في الحياة ؟
            </label>
            <textarea
              type="text"
              name="njahInLife"
              value={userAnswers[33]}
              onChange={handleChange(33)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تعاني من أي أمراض أو إعاقات ؟
            </label>
            <textarea
              type="text"
              name="sick"
              value={userAnswers[34]}
              onChange={handleChange(34)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          {userAnswers[0] === "مطلق" && (
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>ما سبب انفصالك ؟</label>
              <textarea
                type="text"
                name="whyDivorced"
                value={userAnswers[35]}
                onChange={handleChange(35)}
                className={classes["myTextArea"]}
                required
              ></textarea>
            </div>
          )}

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل أنت مدخن ؟</label>
            <textarea
              type="text"
              name="smoke"
              value={userAnswers[40]}
              onChange={handleChange(40)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل يمكنك تحديد مكانك بالضبط (قرية - مركز - منطقة)؟
            </label>
            <textarea
              type="text"
              name="yourVillage"
              value={userAnswers[41]}
              onChange={handleChange(41)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تسمع الموسيقى أو تشاهد الأفلام ؟
            </label>
            <textarea
              type="text"
              name="music"
              value={userAnswers[42]}
              onChange={handleChange(42)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تنوي إقامة حفل زفاف يغضب الله ؟ (اختلاط - موسيقى - فوتوسيشن)
            </label>
            <textarea
              type="text"
              name="party"
              value={userAnswers[43]}
              onChange={handleChange(43)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل علاقتك بأهلك جيدة ؟</label>
            <textarea
              type="text"
              name="relationWithAhl"
              value={userAnswers[44]}
              onChange={handleChange(44)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>كيف تقضي وقت فراغك ؟</label>
            <textarea
              type="text"
              name="yourFreeTime"
              value={userAnswers[45]}
              onChange={handleChange(45)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما هو أكثر ما يشغل تفكيرك معظم الوقت ؟
            </label>
            <textarea
              type="text"
              name="WhatBothersYou"
              value={userAnswers[46]}
              onChange={handleChange(46)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هي أعمار أولادك</label>
            <textarea
              type="text"
              name="childsAge"
              value={userAnswers[17]}
              onChange={handleChange(17)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل لديك الرغبة في السفر للخارج ؟
            </label>
            <textarea
              type="text"
              name="wantToTravel"
              value={userAnswers[14]}
              onChange={handleChange(14)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو عمل الوالد ؟</label>
            <textarea
              type="text"
              name="fathersjOB"
              value={userAnswers[19]}
              onChange={handleChange(19)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو عمل الوالدة ؟</label>
            <textarea
              type="text"
              name="mothersJob"
              value={userAnswers[20]}
              onChange={handleChange(20)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
        </div>
      );
    }
    return <>جاري التحميل...</>;
  };

  const showWomanQuestionsForm = () => {
    if (userAnswers) {
      return (
        <div className={classes["questionsContainer"]}>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الحالة الاجتماعية*</label>
            <select
              name="generalStatus"
              value={userAnswers[0]}
              onChange={handleChange(0)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختاري حالتك</option>
              <option value="عزباء">عزباء</option>
              <option value="مطلقة">مطلقة</option>
              <option value="أرملة">أرملة</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>أين تعيشين حاليا*</label>
            <select
              name="country"
              value={userAnswers[1]}
              onChange={handleChange(1)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="" disabled hidden className="!text-primary">
                اختر الجنسية
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الجنسية*</label>
            <select
              name="nationality"
              value={userAnswers[36]}
              onChange={handleChange(36)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="" disabled hidden className="!text-primary">
                الجنسية
              </option>
              {COUNTRIES.map((country) => {
                return (
                  <option key={country} value={country}>
                    {country}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>المؤهل أو الشهادة*</label>
            <select
              name="certificate"
              value={userAnswers[9]}
              onChange={handleChange(9)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر مؤهلك</option>
              <option value="الشهادة الابتدائية">الشهادة الابتدائية</option>
              <option value="الشهادة الاعدادية">الشهادة الاعدادية</option>
              <option value="الشهادة الثانوية">الشهادة الثانوية</option>
              <option value="دبلوم">دبلوم</option>
              <option value="الجامعية الجامعية">الشهادة الجامعية</option>
              <option value="ماجستير">دراسات عليا - ماجستير</option>
              <option value="دكتوراة">دراسات عليا - دكتوراة</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الوظيفة*</label>
            <input
              type="text"
              name="job"
              value={userAnswers[8]}
              onChange={handleChange(8)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            {
              <>
                <label className={classes.inputLabel}>
                  المحافظة أو المدينة التي تعيشين بها*
                </label>

                <select
                  name="state"
                  value={userAnswers[16]}
                  onChange={handleChange(16)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختاري محافظتك</option>
                  {STATES[userAnswers[1]].map((state) => {
                    return <option value={state}>{state}</option>;
                  })}
                </select>
              </>
            }
          </div>
          {userAnswers[0] != "عزباء" && (
            <>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد أولادك الذكور*</label>
                <select
                  name="maleChilds"
                  value={userAnswers[2]}
                  onChange={handleChange(2)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className={classes.inputContainer}>
                <label className={classes.inputLabel}>عدد بناتك*</label>
                <select
                  name="femaleChilds"
                  value={userAnswers[3]}
                  onChange={handleChange(3)}
                  className={classes["dropdown"]}
                  required={true}
                >
                  <option value="">اختر</option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                </select>
              </div>
            </>
          )}
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>العمر*</label>
            <input
              type="Number"
              name="age"
              value={userAnswers[6]}
              onChange={handleChange(6)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الطول*</label>
            <input
              type="Number"
              name="height"
              value={userAnswers[4]}
              onChange={handleChange(4)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>الوزن*</label>
            <input
              type="Number"
              name="weight"
              value={userAnswers[5]}
              onChange={handleChange(5)}
              className={classes["textInput"]}
              required
            />
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما مدى التزامك بالصلاة؟*
            </label>
            <select
              name="pray"
              value={userAnswers[13]}
              onChange={handleChange(13)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="أصلي جميع الصلوات في وقتها في البيت">
                أصلي جميع الصلوات في وقتها في البيت
              </option>
              <option value="أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها">
                أصلي جميع الصلوات ولكن قد أفوت بعض الصلوات عن وقتها
              </option>
              <option value="متقطعة في الصلاة">متقطعة في الصلاة</option>
              <option value="لا أصلي">لا أصلي معظم الوقت</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما نوع حجابك</label>
            <select
              name="hijab"
              value={userAnswers[12]}
              onChange={handleChange(12)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="منتقبة سواد">منتقبة سواد</option>
              <option value="منتقبة نقاب ملون">منتقبة نقاب ملون</option>
              <option value="مختمرة">مختمرة</option>
              <option value="طرح وفساتين">طرح وفساتين</option>
              <option value="طرح وبناطيل">طرح وبناطيل</option>
              <option value="غير محجبة">غير محجبة</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              عدد الأجزاء التي تحفظينها من القرآن*
            </label>
            <select
              name="quran"
              value={userAnswers[18]}
              onChange={handleChange(18)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختر</option>
              <option value="جزء واحد">جزء واحد - 1</option>
              <option value="جزءان">جزءان - 2</option>
              <option value="ثلاثة أجزاء">ثلاثة أجزاء - 3</option>
              <option value="أربعة أجزاء">أربعة أجزاء - 4</option>
              <option value="خمسة أجزاء">خمسة أجزاء - 5</option>
              <option value="ستة أجزاء">ستة أجزاء - 6</option>
              <option value="سبعة أجزاء">سبعة أجزاء - 7</option>
              <option value="ثمانية أجزاء">ثمانية أجزاء - 8</option>
              <option value="تسعة أجزاء">تسعة أجزاء - 9</option>
              <option value="عشرة أجزاء">عشرة أجزاء - 10</option>
              <option value="أحد عشر جزءا">أحد عشر جزءا - 11</option>
              <option value="اثنا عشر جزءا">اثنا عشر جزءا - 12</option>
              <option value="ثلاثة عشر جزءا">ثلاثة عشر جزءا - 13</option>
              <option value="أربعة عشر جزءا">أربعة عشر جزءا - 14</option>
              <option value="خمسة عشر جزءا">خمسة عشر جزءا - 15</option>
              <option value="ستة عشر جزءا">ستة عشر جزءا - 16</option>
              <option value="سبعة عشر جزءا">سبعة عشر جزءا - 17</option>
              <option value="ثمانية عشر جزءا">ثمانية عشر جزءا - 18</option>
              <option value="تسعة عشر جزءا">تسعة عشر جزءا - 19</option>
              <option value="عشرون جزءا">عشرون جزءا - 20</option>
              <option value="واحد وعشرون جزءا">واحد وعشرون جزءا - 21</option>
              <option value="ثنان وعشرون جزءا">اثنان وعشرون جزءا - 22</option>
              <option value="ثلاثة وعشرون جزءا">ثلاثة وعشرون جزءا - 23</option>
              <option value="أربعة وعشرون جزءا">أربعة وعشرون جزءا - 24</option>
              <option value="خمسة وعشرون جزءا">خمسة وعشرون جزءا - 25</option>
              <option value="ستة وعشرون جزءا">ستة وعشرون جزءا - 26</option>
              <option value="سبعة وعشرون جزءا">سبعة وعشرون جزءا - 27</option>
              <option value="ثمانية وعشرون جزءا">
                ثمانية وعشرون جزءا - 28
              </option>
              <option value="تسعة وعشرون جزءا">تسعة وعشرون جزءا - 29</option>
              <option value="ختمت القرآن">ختمت القرآن - 30</option>
            </select>
          </div>
          {userAnswers[12] != "منتقبة سواد" &&
            userAnswers[12] != "منتقبة نقاب ملون" && (
              <>
                <div className={classes.inputContainer}>
                  <label className={classes.inputLabel}>
                    *هل لديك استعداد أو رغبة في لبس النقاب؟
                  </label>
                  <select
                    name="wantNiqab"
                    value={userAnswers[22]}
                    onChange={handleChange(22)}
                    className={classes["dropdown"]}
                    required={true}
                  >
                    <option value="">اختر</option>
                    <option value="نعم أتمنى">نعم أتمنى</option>
                    <option value="ربما">ربما</option>
                    <option value="لا">لا أريد</option>
                  </select>
                </div>
              </>
            )}
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              أخبرينا عن نفسك أو بما يقوله الناس عنك*
            </label>
            <textarea
              type="text"
              name="aboutYou"
              value={userAnswers[10]}
              onChange={handleChange(10)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما هي المواصفات التي تريدينها في زوجك*
            </label>
            <textarea
              type="text"
              name="aboutYourPartner"
              value={userAnswers[11]}
              onChange={handleChange(11)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل ولي الأمر على علم بتسجيلك في هذا الموقع ؟
            </label>
            <select
              name="fatherKnowAboutUs"
              value={userAnswers[37]}
              onChange={handleChange(37)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختاري</option>
              <option value="نعم يعلم">نعم يعلم</option>
              <option value="لا يعلم ولكن يمكنني اخباره فيما بعد">
                لا يعلم ولكن يمكنني اخباره فيما بعد
              </option>
              <option value="لا">لا يعلم وأحتاج للمساعدة في إخباره</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تقبلين أن تتزوجي بدون قائمة منقولات على أن يتكفل الزوج بكل شيء
              حسب استطاعته؟
            </label>
            <select
              name="youWantIslam"
              value={userAnswers[38]}
              onChange={handleChange(38)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختاري</option>
              <option value="نعم أقبل">نعم أقبل</option>
              <option value="ربما">ربما</option>
              <option value="لا أقبل">لا أقبل</option>
            </select>
          </div>
          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل يقبل ولي أمرك أن تتزوجي بدون قائمة منقولات على أن يتكفل الزوج
              بكل شيء حسب استطاعته؟
            </label>
            <select
              name="fatherWantIslam"
              value={userAnswers[39]}
              onChange={handleChange(39)}
              className={classes["dropdown"]}
              required={true}
            >
              <option value="">اختاري</option>
              <option value="نعم يقبل">نعم يقبل</option>
              <option value="ربما">ربما</option>
              <option value="لا يقبل">لا يقبل</option>
            </select>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              من هم شيوخك الذين تأخذين العلم عنهم
            </label>
            <textarea
              type="text"
              name="yourShiekh"
              value={userAnswers[24]}
              onChange={handleChange(24)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما مفهومك عن القوامة</label>
            <textarea
              type="text"
              name="qwamaUnderstanding"
              value={userAnswers[25]}
              onChange={handleChange(25)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>أين تعملين تحديدا؟</label>
            <textarea
              type="text"
              name="whereDoYouWord"
              value={userAnswers[26]}
              onChange={handleChange(26)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تعانين من الخوف المفرط من بعض الأشياء ؟
            </label>
            <textarea
              type="text"
              name="anyPhobia"
              value={userAnswers[27]}
              onChange={handleChange(27)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل أنت على دراية بضوابط الخطبة الشرعية ومستعدة للالتزام بها؟
            </label>
            <textarea
              type="text"
              name="dawabet"
              value={userAnswers[29]}
              onChange={handleChange(29)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو هدفك في الحياة</label>
            <textarea
              type="text"
              name="yourLifeGoal"
              value={userAnswers[30]}
              onChange={handleChange(30)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل لك نصيب من طلب العلم الشرعي ؟
            </label>
            <textarea
              type="text"
              name="learningDeen"
              value={userAnswers[31]}
              onChange={handleChange(31)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تحافظين على أذكار الصباح والمساء ؟
            </label>
            <textarea
              type="text"
              name="azkar"
              value={userAnswers[32]}
              onChange={handleChange(32)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما مفهومك عن النجاح في الحياة ؟
            </label>
            <textarea
              type="text"
              name="njahInLife"
              value={userAnswers[33]}
              onChange={handleChange(33)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تعانين من أي أمراض أو إعاقات ؟
            </label>
            <textarea
              type="text"
              name="sick"
              value={userAnswers[34]}
              onChange={handleChange(34)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          {userAnswers[0] === "مطلقة" && (
            <div className={classes.inputContainer}>
              <label className={classes.inputLabel}>ما سبب انفصالك ؟</label>
              <textarea
                type="text"
                name="whyDivorced"
                value={userAnswers[35]}
                onChange={handleChange(35)}
                className={classes["myTextArea"]}
                required
              ></textarea>
            </div>
          )}

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل أنت مدخنة ؟</label>
            <textarea
              type="text"
              name="smoke"
              value={userAnswers[40]}
              onChange={handleChange(40)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل يمكنك تحديد مكانك بالضبط (قرية - مركز - منطقة)؟
            </label>
            <textarea
              type="text"
              name="yourVillage"
              value={userAnswers[41]}
              onChange={handleChange(41)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تسمعين الموسيقى أو تشاهدين الأفلام ؟
            </label>
            <textarea
              type="text"
              name="music"
              value={userAnswers[42]}
              onChange={handleChange(42)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل تنوين إقامة حفل زفاف يغضب الله ؟ (اختلاط - موسيقى - فوتوسيشن)
            </label>
            <textarea
              type="text"
              name="party"
              value={userAnswers[43]}
              onChange={handleChange(43)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل علاقتك بأهلك جيدة ؟</label>
            <textarea
              type="text"
              name="relationWithAhl"
              value={userAnswers[44]}
              onChange={handleChange(44)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>كيف تقضين وقت فراغك ؟</label>
            <textarea
              type="text"
              name="yourFreeTime"
              value={userAnswers[45]}
              onChange={handleChange(45)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              ما هو أكثر ما يشغل تفكيرك معظم الوقت ؟
            </label>
            <textarea
              type="text"
              name="WhatBothersYou"
              value={userAnswers[46]}
              onChange={handleChange(46)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>هل تجيدين الطبخ ؟</label>
            <textarea
              type="text"
              name="cooking"
              value={userAnswers[47]}
              onChange={handleChange(47)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هي أعمار أولادك</label>
            <textarea
              type="text"
              name="childsAge"
              value={userAnswers[17]}
              onChange={handleChange(17)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>
              هل لديك الرغبة في السفر للخارج ؟
            </label>
            <textarea
              type="text"
              name="wantToTravel"
              value={userAnswers[14]}
              onChange={handleChange(14)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو عمل الوالد ؟</label>
            <textarea
              type="text"
              name="fathersjOB"
              value={userAnswers[19]}
              onChange={handleChange(19)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>

          <div className={classes.inputContainer}>
            <label className={classes.inputLabel}>ما هو عمل الوالدة ؟</label>
            <textarea
              type="text"
              name="mothersJob"
              value={userAnswers[20]}
              onChange={handleChange(20)}
              className={classes["myTextArea"]}
              required
            ></textarea>
          </div>
        </div>
      );
    }
    return <>جاري التحميل...</>;
  };

  const init = () => {
    getQuestions().then((data) => {
      setQuestions(data);
      setValues({ ...values, error: data.error });
    });
    getProfile(token).then((data) => {
      if (data.error) {
      } else {
        setUser(data);
        setUserAnswers(data.questions);
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    const userData = new FormData();
    userData.set("questions", JSON.stringify(userAnswers));

    update(token, userData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        updateUser(data, () => {
          setValues({
            ...values,
            success: true,
            loading: false,
          });
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      تم تحديث البيانات
    </div>
  );

  const showLoading = () => (
    <div
      className="alert alert-info"
      style={{ display: loading ? "" : "none" }}
    >
      جاري التحميل ...
    </div>
  );

  if (!user) {
    return <div>جاري التحميل...</div>;
  }

  return (
    <>
      {user.gender === "man"
        ? showMenQuestionsForm()
        : showWomanQuestionsForm()}

      <div>
        <br />
        {showSuccess()}
        {showError()}
        {showLoading()}
      </div>
      <button className={classes["submit"]} onClick={handleSubmit}>
        حفظ التعديلات
      </button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default ProfileUpdateQuestions;
