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

  <div class="form-group row">
    <div class="col-sm-10">
      <button type="submit" class="btn btn-primary">Thêm</button>
    </div>
  </div>
</form>
</template>