<template>
  <div class="row">
    <div class="img col-md-6"></div>
    <div class="col-md-6">
      <div class="card">
        <Form @submit="handleRegister" :validation-schema="registerFormSchema">
          <div v-if="!successful">
            <div class="form-group">
              <label for="fullname">Họ và tên</label>
              <Field name="fullname" type="text" class="form-control" />
              <ErrorMessage name="fullname" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="username">Tên đăng nhập</label>
              <Field name="username" type="text" class="form-control" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="password">Mật khẩu</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <Field name="email" type="email" class="form-control" />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="address">Địa chỉ</label>
              <Field name="address" type="text" class="form-control" />
              <ErrorMessage name="address" class="error-feedback" />
            </div>

            <div class="form-group">
              <label for="phone">Số điện thoại</label>
              <Field name="phone" type="text" class="form-control" />
              <ErrorMessage name="phone" class="error-feedback" />
            </div>

            <div class="form-group">
              <button class="btn btn-primary btn-block" :disabled="loading">
                <span
                  v-show="loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                Đăng ký
              </button>
            </div>
          </div>
        </Form>
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapActions } from "pinia";
import "yup-phone";
import { useAuthStore } from "@/stores/auth.store";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const registerFormSchema = yup.object().shape({
      fullname: yup
        .string()
        .required("Họ tên phải có giá trị.")
        .min(10, "Họ tên phải ít nhất 10 ký tự.")
        .max(50, "Họ tên tối đa có 50 ký tự."),
      username: yup
        .string()
        .required("Tên đăng nhập phải có giá trị.")
        .min(3, "Tên đăng nhập phải ít nhất 2 ký tự.")
        .max(20, "Tên đăng nhập tối đa có 20 ký tự."),
      password: yup
        .string()
        .required("Mật khẩu phải có giá trị.")
        .min(6, "Mật khẩu tối thiểu 6 ký tự.")
        .max(40, "Mật khẩu tối đa 40 ký tự."),
      email: yup
        .string()
        .required("E-mail phải có giá trị.")
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),

      address: yup
        .string()
        .required("Địa chỉ phải có giá trị.")
        .min(2, "Địa chỉ phải ít nhất 2 ký tự.")
        .max(50, "Địa chỉ tối đa có 50 ký tự."),
      phone: yup
        .string()
        .required("Số điện phải có giá trị.")
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      registerFormSchema,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["register"]),
    async handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;
      try {
        const data = await this.register(user);
        this.message = data.message;
        this.successful = true;
        this.loading = false;
      } catch (error) {
        console.log(error);

        this.message = "Đã có lỗi xảy ra.";
        this.successful = false;
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "@/assets/form.css";
.row {
  background-repeat: no-repeat;
  background-size: cover;
  height: 691px;
  color: black;
  background-image: url(../assets/images/ws_Nike_Sneakers_Sports_852x480.jpg.crdownload);
}
.img.col-md-6 img {
  width: 200px;
}
.card {
  color: #000000db;
  font-weight: 700;
  width: 550px;
  box-shadow: 15px -10px 19px 3px #8f8f8f;
  padding: 30px 40px 30px 40px;
  border-radius: 22px;
  background-color: #c4c4c452;
  border: 1px solid #ffffff78;
  margin-top: 0px;
}
.drop {
  display: flex;
  flex-basis: 3;
}
.drop1 {
  flex: 2;
}
</style>
