<template>
    <form>
  <div class="form-group row">
    <label for="inputEmail3" class="col-sm-2 col-form-label">Username</label>
    <div class="col-sm-10">
      <b-input type="text" placeholder="Username" icon="account"></b-input>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
    <div class="col-sm-10">
      <b-input type="password" password-reveal placeholder="Password" icon="key"></b-input>
    </div>
  </div>
  <div class="form-group row">
    <label for="inputPassword3" class="col-sm-2 col-form-label">Email</label>
    <div class="col-sm-10">
      <b-input type="email"  placeholder="example@gmail.com" icon="email"></b-input>
    </div>
  </div>
  <fieldset class="form-group">
    <div class="row">
      <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
      <div class="col-sm-10">
        <div class="form-check">
          <b-radio v-model="radio"
                name="name"
                native-value="Flint">
                Nam
            </b-radio>
            <b-radio v-model="radio"
                name="name"
                native-value="Silver">
                Nữ
            </b-radio>
        </div>
        <div class="form-check">
         
        </div>
        <div class="form-check disabled">
          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
          <label class="form-check-label" for="gridRadios3">
            Third disabled radio
          </label>
        </div>
      </div>
    </div>
  </fieldset>

  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Thêm</button>
    </div>
  </div>
</form>
</template>