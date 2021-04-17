<template>
  <div class="Member">
    <div>
      <header class="mb-3">
        <a href="#" class="burger-btn d-block d-xl-none">
          <i class="bi bi-justify fs-3"></i>
        </a>
      </header>
      <notifications position="top right" />
      <div class="page-heading">
        <h3>สมาชิก</h3>
      </div>
      <div class="page-content">
        <section class="row">
          <div class="card m-0 p-0">
            <div class="table-responsive">
              <table class="table table-borderless">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">ลำดับ</th>
                    <th scope="col">ชื่อ-นามสกุล</th>
                    <th scope="col">วันหมดอายุ</th>
                    <th scope="col">สถานะการชำระเงิน</th>
                    <th scope="col">
                      <!-- <button
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        <i class="fas fa-user-plus mx-2"></i> เพิ่มสมาชิก
                      </button> -->

                      <div>
                        <b-button v-b-modal.modal-no-backdrop variant="primary"
                          ><i class="fas fa-user-plus mx-2"></i>
                          เพิ่มสมาชิก</b-button
                        >

                        <b-modal
                          id="modal-no-backdrop"
                          hide-footer
                          content-class="shadow"
                          title="ใบสมัครเป็นสมาชิก"
                          size="xl"
                        >
                          <!-- <p class="my-2">
                        We've added the utility hide-backdrop class <code>'shadow'</code>
                        to the modal content for added effect.
                      </p> -->
                          <form v-on:submit.prevent="onSubmit">
                            <!-- <h4>ใบสมัครเป็นสมาชิก</h4> -->
                            <fieldset class="form-group row">
                              <legend
                                class="col-form-label col-auto float-sm-left pt-0"
                              >
                                ข้าพเจ้า
                              </legend>
                              <div class="col-auto d-flex">
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios1"
                                    value="1"
                                    :checked="arr.gender == '1'"
                                    v-model="arr.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios1"
                                  >
                                    นาย
                                  </label>
                                </div>
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios2"
                                    value="2"
                                    :checked="arr.gender == '2'"
                                    v-model="arr.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios2"
                                  >
                                    นาง
                                  </label>
                                </div>
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios"
                                    id="gridRadios3"
                                    value="3"
                                    :checked="arr.gender == '3'"
                                    v-model="arr.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios3"
                                  >
                                    นางสาว
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                            <div class="row">
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                ชื่อ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.firstname"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                นามสกุล
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.lastname"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                อายุ / ปี
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.age"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                วันเกิด<br />
                                <VueCtkDateTimePicker
                                  format="YYYY-MM-DD"
                                  formatted="L"
                                  v-model="arr.b_date"
                                  type="day"
                                  class="w-100"
                                  :no-label="true"
                                  :only-date="true"
                                  :no-header="true"
                                  :no-button-now="true"
                                  locale="th"
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                ชื่อ (สามี/ภรรยา)
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.married"
                                  required
                                />
                              </div>
                              <!-- <div class="col-xl-6 col-md-12 col-sm-12 d-flex align-items-center mt-2">
                                ชื่อ
                                <input
                                  type="text"
                                  class="form-control form-control-sm ml-2"
                                  placeholder=""
                                  v-model="arr.firstname"
                                  required
                                />
                              </div> -->
                              <!-- <div class="col-xl-6 col-md-12 col-sm-12 d-flex align-items-center mt-2">
                                นามสกุล
                                <input
                                  type="text"
                                  class="form-control form-control-sm ml-2"
                                  placeholder=""
                                  v-model="arr.lastname"
                                  required
                                />
                              </div> -->
                              <!-- <div class="col-xl-4 col-md-12 col-sm-12 d-flex align-items-center mt-2">
                                อายุ
                                <input
                                  type="text"
                                  class="form-control form-control-sm mx-2 w-50"
                                  placeholder=""
                                  v-model="arr.age"
                                  required
                                />
                                ปี
                              </div> -->

                              <!-- <div class="col-xl-6 col-md-12 col-sm-12 d-flex align-items-center mt-2 mb-2">
                                วันเกิด
                                <date-picker
                                  v-model="arr.b_date"
                                  lang="en"
                                  type="day"
                                  format="DD-MM-YYYY"
                                  class="mx-1"
                                ></date-picker>
                              </div> -->
                              <!-- <div class="text-left mt-3 ">
                                ชื่อ(สามี/ภรรยา)
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12 d-flex align-items-center">
                                <input
                                  type="text"
                                  class="form-control form-control-sm "
                                  placeholder=""
                                  v-model="arr.married"
                                  required
                                />
                              </div> -->
                            </div>
                            <div class="row text-left">
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                ตั้งบ้านเรือนอยู่เลขที่
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.h_num"
                                  required
                                />
                              </div>
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                ถนน
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.road"
                                  required
                                />
                              </div>
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                ตำบล
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.locality"
                                  required
                                />
                              </div>
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                อำเภอ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.district"
                                  required
                                />
                              </div>
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                จังหวัด
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.province"
                                  required
                                />
                              </div>
                              <div class="col-xl-4 col-md-12 col-sm-12">
                                รหัสไปรษณีย์
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.address.zip_code"
                                  required
                                />
                              </div>
                            </div>
                            <div class="row d-flex text-left">
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                ชื่อพาณิชยกิจประกอบการ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.commercial_affairs"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                ประเภทวิสาหกิจประกอบการ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.commercial_type"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                ที่ตั้งประกอบการ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.commercial_address"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                โทรศัพท์ / โทรสาร
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.phone"
                                  required
                                />
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                โทรศัพท์มือถือ
                                <input
                                  type="text"
                                  class="form-control form-control-sm"
                                  placeholder=""
                                  v-model="arr.mobile"
                                  required
                                />
                              </div>
                            </div>
                            <p class="text-left col-12 p-0">
                              ข้าพเจ้าทราบ และเข้าใจ
                              ในข้อบังคับของหอการค้าจังหวัดนครพนมดีแล้ว
                              จึงขอสมัครเป็นสมาชิกของหอการค้าจังหวัด นครพนม
                            </p>
                            <fieldset class="form-group row">
                              <legend
                                class="col-form-label col-auto float-sm-left pt-0"
                              >
                                ประเภท
                              </legend>
                              <div class="col-auto d-flex">
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios11"
                                    id="gridRadios11"
                                    value="1"
                                    v-model="arr.member_type"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios11"
                                  >
                                    สามัญ
                                  </label>
                                </div>
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios22"
                                    id="gridRadios22"
                                    value="2"
                                    v-model="arr.member_type"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios22"
                                  >
                                    สมทบ
                                  </label>
                                </div>
                              </div>
                            </fieldset>
                            <p class="text-left">
                              พร้อมนี้ได้แนบ
                              (ถ้าเป็นร้านบุคคลธรรมดาต้องแนบภาพถ่ายใบทะเบียนพาณิชย์หรือใบทะเบียนการค้า
                              ถ้าเป็นนิติบุคคลต้องแนบภาพถ่ายหนังสือรับรองนายทะเบียนหุ้นส่วนบริษัทและหนังสือมอบอำนาจ
                              ซึ่งระบุว่านิติบุคคลนั้นตกลงมอบอำนาจให้หุ้นส่วนผู้จัดการ
                            </p>
                            <fieldset class="form-group row">
                              <legend
                                class="col-form-label col-auto float-sm-left pt-0"
                              >
                                ชื่อ
                              </legend>
                              <div class="col-auto d-flex">
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios111"
                                    id="gridRadios111"
                                    value="gen1"
                                    v-model="arr.managing_partner.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios111"
                                  >
                                    นาย
                                  </label>
                                </div>
                                <div class="form-check ml-3">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios222"
                                    id="gridRadios222"
                                    value="gen2"
                                    v-model="arr.managing_partner.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios222"
                                  >
                                    นาง
                                  </label>
                                </div>
                                <div class="form-check ml-3 ">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="gridRadios333"
                                    id="gridRadios333"
                                    value="gen3"
                                    v-model="arr.managing_partner.gender"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="gridRadios333"
                                  >
                                    นางสาว
                                  </label>
                                </div>
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12">
                                <input
                                  type="text"
                                  class="form-control form-control-sm ml-2"
                                  placeholder=""
                                  v-model="arr.managing_partner.fullname"
                                  required
                                />
                              </div>
                            </fieldset>
                            <p class="text-left col-12">
                              เป็นผู้มีอำนาจทำการแทนได้ทุกอย่างเพียงคนเดียวตามข้อบังคับที่
                              10 รวมเอกสารจำนวน 1 ฉบับ )
                            </p>
                            <div class="row text-left">
                              <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                                อัพโหลดรูป สำเนาทะเบียนบ้าน
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="inputGroupFile01"
                                    @change="processFile0($event)"
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="inputGroupFile01"
                                    >{{ arr.house_particulars_img.name }}</label
                                  >
                                </div>
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                                อัพโหลดรูป สำเนาบัตรประชาชน
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="inputGroupFile02"
                                    @change="processFile1($event)"
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="inputGroupFile02"
                                    >{{ arr.id_card_img.name }}</label
                                  >
                                </div>
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                                อัพโหลดรูป
                                สำเนาทะเบียนพาณิชย์หรือทะเบียนการค้า/หนังสือรับรองการจดทะเบียน
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="inputGroupFile03"
                                    @change="processFile2($event)"
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="inputGroupFile03"
                                    >{{
                                      arr.commercial_particulars_img.name
                                    }}</label
                                  >
                                </div>
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                                อัพโหลดรูปถ่าย 1 หรือ 2 นิ้ว จำนวน 2 รูป
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="inputGroupFile04"
                                    @change="processFile3($event)"
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="inputGroupFile04"
                                    >{{ arr.profile_img.name }}</label
                                  >
                                </div>
                              </div>
                              <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                                อัพโหลดรูป ค่าบำรุงสมาชิก (รายปี) 1,000 บาท/ปี
                                <div class="custom-file">
                                  <input
                                    type="file"
                                    class="custom-file-input"
                                    id="inputGroupFile05"
                                    @change="processFile4($event)"
                                  />
                                  <label
                                    class="custom-file-label"
                                    for="inputGroupFile05"
                                    >{{ arr.slip_img.name }}</label
                                  >
                                </div>
                              </div>
                            </div>
                            <div class="col-xl-6 col-md-12 col-sm-12">
                              ชื่อผู้ใช้
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                placeholder=""
                                v-model="arr.username"
                                required
                              />
                            </div>
                            <div class="col-xl-6 col-md-12 col-sm-12">
                              รหัสผ่าน
                              <input
                                type="password"
                                class="form-control form-control-sm"
                                placeholder=""
                                v-model="arr.password"
                                required
                              />
                            </div>

                            <div class="col-xl-6 col-md-12 col-sm-12">
                              ยืนยันรหัสผ่าน
                              <input
                                v-bind:style="classvalidate"
                                v-on:keyup="validate"
                                type="password"
                                class="form-control form-control-sm"
                                placeholder=""
                                v-model="arr.repassword"
                                required
                              />
                            </div>
                            <div class="text-center">
                              <button
                                type="submit"
                                class="btn btn-primary mb-5 mt-5 "
                                @click="$bvModal.hide('modal-no-backdrop')"
                              >
                                สม้คร
                              </button>
                            </div>
                          </form>
                        </b-modal>
                      </div>
                    </th>
                    <!-- <div>
                    <b-button v-b-modal.modal-no-backdrop variant="primary" ><i class="fas fa-user-plus mx-2"></i> เพิ่มสมาชิก</b-button>
                    <b-modal id="modal-no-backdrop" hide-footer content-class="shadow" title="ใบสมัครเป็นสมาชิก" size="xl">
                   </b-modal>
                  </div> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="member in pageOfItems" :key="member.id">
                    <td scope="row">{{ member.id + 1 }}</td>
                    <td>
                      {{ member.member.firstname }} {{ member.member.lastname }}
                    </td>
                    <td>{{ member.member.created_date | formatDate }}</td>
                    <td>
                      {{
                        member.member.status == 0
                          ? "ยังไม่ชำระเงิน"
                          : "ชำระเงินแล้ว"
                      }}
                    </td>
                    <td>
                      <button
                        class="btn btn-primary"
                        @click="deleteMember(member.member.member_id)"
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                      <b-button
                        b-button
                        v-b-modal.modal-edit
                        variant="primary"
                        @click="
                          getMembers_profile(member.id, member.member.member_id)
                        "
                      >
                        <i class="fas fa-edit"></i>
                      </b-button>
                      <b-button
                        b-button
                        v-b-modal.modal-image
                        variant="primary"
                        @click="getMembers_image(member.member.member_id)"
                      >
                        <i class="fas fa-tasks"></i>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center m-3 pb-0 pt-3">
              <jw-pagination
                :pageSize="10"
                :labels="customLabels"
                :items="exampleItems ? exampleItems : undefined"
                @changePage="onChangePage"
              ></jw-pagination>
            </div>
          </div>
          <!-- Button trigger modal -->
          <!-- Modal -->
          <!-- button edit -->
          <b-modal
            id="modal-edit"
            hide-footer
            content-class="shadow"
            title="แก้ไขข้อมูลสมาชิก"
            size="xl"
          >
            <form v-on:submit.prevent="updateMember">
              <h4>ใบสมัครเป็นสมาชิก</h4>

              <fieldset class="form-group row">
                <legend class="col-form-label col-auto float-sm-left pt-0">
                  ข้าพเจ้า
                </legend>
                <div class="col-auto d-flex">
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="1"
                      :checked="member.gender == '1'"
                      v-model="member.gender"
                    />
                    <label class="form-check-label" for="gridRadios1">
                      นาย
                    </label>
                  </div>
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="2"
                      :checked="member.gender == '2'"
                      v-model="member.gender"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      นาง
                    </label>
                  </div>
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="3"
                      :checked="member.gender == '3'"
                      v-model="member.gender"
                    />
                    <label class="form-check-label" for="gridRadios3">
                      นางสาว
                    </label>
                  </div>
                </div>
              </fieldset>
              <div class="row">
                <div class="col-xl-6 col-md-12 col-sm-12">
                  ชื่อ
                  <input
                    type="text"
                    class="form-control form-control-sm "
                    placeholder=""
                    v-model="member.firstname"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  นามสกุล
                  <input
                    type="text"
                    class="form-control form-control-sm "
                    placeholder=""
                    v-model="member.lastname"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  อายุ / ปี
                  <input
                    type="text"
                    class="form-control form-control-sm "
                    placeholder=""
                    v-model="member.age"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  วันเกิด<br />
                  <VueCtkDateTimePicker
                    format="YYYY-MM-DD"
                    formatted="L"
                    v-model="member.b_date"
                    class="w-100"
                    :no-label="true"
                    :only-date="true"
                    :no-header="true"
                    :no-button-now="true"
                    locale="th"
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  ชื่อ (สามี/ภรรยา)
                  <input
                    type="text"
                    class="form-control form-control-sm "
                    placeholder=""
                    v-model="member.married"
                    required
                  />
                </div>
              </div>
              <div class="row text-left">
                <div class="col-xl-4 col-md-12 col-sm-12">
                  ตั้งบ้านเรือนอยู่เลขที่
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.h_num"
                    required
                  />
                </div>
                <div class="col-xl-4 col-md-12 col-sm-12">
                  ถนน
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.road"
                    required
                  />
                </div>
                <div class="col-xl-4 col-md-12 col-sm-12">
                  ตำบล
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.locality"
                    required
                  />
                </div>
                <div class="col-xl-4 col-md-12 col-sm-12">
                  อำเภอ
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.district"
                    required
                  />
                </div>
                <div class="col-xl-4 col-md-12 col-sm-12">
                  จังหวัด
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.province"
                    required
                  />
                </div>
                <div class="col-xl-4 col-md-12 col-sm-12">
                  รหัสไปรษณีย์
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.address.zip_code"
                    required
                  />
                </div>
              </div>
              <div class="row d-flex text-left">
                <div class="col-xl-6 col-md-12 col-sm-12">
                  ชื่อพาณิชยกิจประกอบการ
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.commercial_affairs"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  ประเภทวิสาหกิจประกอบการ
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.commercial_type"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  ที่ตั้งประกอบการ
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.commercial_address"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  โทรศัพท์ / โทรสาร
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.phone"
                    required
                  />
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  โทรศัพท์มือถือ
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    placeholder=""
                    v-model="member.mobile"
                    required
                  />
                </div>
              </div>
              <p class="text-left col-12 p-0">
                ข้าพเจ้าทราบ และเข้าใจ ในข้อบังคับของหอการค้าจังหวัดนครพนมดีแล้ว
                จึงขอสมัครเป็นสมาชิกของหอการค้าจังหวัด นครพนม
              </p>
              <fieldset class="form-group row">
                <legend class="col-form-label col-auto float-sm-left pt-0">
                  ประเภท
                </legend>
                <div class="col-auto d-flex">
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios11"
                      id="gridRadios11"
                      value="1"
                      v-model="member.member_type"
                    />
                    <label class="form-check-label" for="gridRadios11">
                      สามัญ
                    </label>
                  </div>
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios22"
                      id="gridRadios22"
                      value="2"
                      v-model="member.member_type"
                    />
                    <label class="form-check-label" for="gridRadios22">
                      สมทบ
                    </label>
                  </div>
                </div>
              </fieldset>
              <p class="text-left">
                พร้อมนี้ได้แนบ
                (ถ้าเป็นร้านบุคคลธรรมดาต้องแนบภาพถ่ายใบทะเบียนพาณิชย์หรือใบทะเบียนการค้า
                ถ้าเป็นนิติบุคคลต้องแนบภาพถ่ายหนังสือรับรองนายทะเบียนหุ้นส่วนบริษัทและหนังสือมอบอำนาจ
                ซึ่งระบุว่านิติบุคคลนั้นตกลงมอบอำนาจให้หุ้นส่วนผู้จัดการ
              </p>
              <fieldset class="form-group row">
                <legend class="col-form-label col-auto float-sm-left pt-0">
                  ชื่อ
                </legend>
                <div class="col-auto d-flex">
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios111"
                      id="gridRadios111"
                      value="gen1"
                      v-model="member.managing_partner.gender"
                    />
                    <label class="form-check-label" for="gridRadios111">
                      นาย
                    </label>
                  </div>
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios222"
                      id="gridRadios222"
                      value="gen2"
                      v-model="member.managing_partner.gender"
                    />
                    <label class="form-check-label" for="gridRadios222">
                      นาง
                    </label>
                  </div>
                  <div class="form-check ml-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios333"
                      id="gridRadios333"
                      value="gen3"
                      v-model="member.managing_partner.gender"
                    />
                    <label class="form-check-label" for="gridRadios333">
                      นางสาว
                    </label>
                  </div>
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12">
                  <input
                    type="text"
                    class="form-control form-control-sm ml-2"
                    placeholder=""
                    v-model="member.managing_partner.fullname"
                    required
                  />
                </div>
              </fieldset>
              <p class="text-left col-12">
                เป็นผู้มีอำนาจทำการแทนได้ทุกอย่างเพียงคนเดียวตามข้อบังคับที่ 10
                รวมเอกสารจำนวน 1 ฉบับ )
              </p>
              <div class="row text-left">
                <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                  อัพโหลดรูป สำเนาทะเบียนบ้าน
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile01"
                      @change="processFile($event, 'house_particulars_img')"
                    />
                    <label class="custom-file-label" for="inputGroupFile01">{{
                      image_update.house_particulars_img.name
                    }}</label>
                  </div>
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                  อัพโหลดรูป สำเนาบัตรประชาชน
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile02"
                      @change="processFile($event, 'id_card_img')"
                    />
                    <label class="custom-file-label" for="inputGroupFile02">{{
                      image_update.id_card_img.name
                    }}</label>
                  </div>
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                  อัพโหลดรูป
                  สำเนาทะเบียนพาณิชย์หรือทะเบียนการค้า/หนังสือรับรองการจดทะเบียน
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile03"
                      @change="
                        processFile($event, 'commercial_particulars_img')
                      "
                    />
                    <label class="custom-file-label" for="inputGroupFile03">{{
                      image_update.commercial_particulars_img.name
                    }}</label>
                  </div>
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                  อัพโหลดรูปถ่าย 1 หรือ 2 นิ้ว จำนวน 2 รูป
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile04"
                      @change="processFile($event, 'profile_img')"
                    />
                    <label class="custom-file-label" for="inputGroupFile04">{{
                      image_update.profile_img.name
                    }}</label>
                  </div>
                </div>
                <div class="col-xl-6 col-md-12 col-sm-12 mb-3">
                  อัพโหลดรูป ค่าบำรุงสมาชิก (รายปี) 1,000 บาท/ปี
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="inputGroupFile05"
                      @change="processFile($event, 'slip_img')"
                    />
                    <label class="custom-file-label" for="inputGroupFile05">{{
                      image_update.slip_img.name
                    }}</label>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-md-12 col-sm-12">
                ชื่อผู้ใช้
                <input
                  type="text"
                  class="form-control form-control-sm"
                  placeholder=""
                  v-model="member.username"
                  required
                />
              </div>
              <div class="col-xl-6 col-md-12 col-sm-12">
                รหัสผ่าน
                <input
                  type="password"
                  class="form-control form-control-sm"
                  placeholder=""
                  v-model="member.plain_password"
                  required
                />
              </div>
              <!-- <div class="col-6">
                                  ยืนยันรหัสผ่าน
                                  <input
                                    v-bind:style="classvalidate"
                                    v-on:keyup="validate"
                                    type="password"
                                    class="form-control form-control-sm"
                                    placeholder=""
                                    v-model="member.repassword"
                                    required
                                  />
                                </div> -->
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-secondary mb-5 mt-5 mr-2"
                  @click="$bvModal.hide('modal-edit')"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="btn btn-primary mb-5 mt-5 "
                  @click="$bvModal.hide('modal-edit')"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </b-modal>

          <!-- button checked -->
          <!-- Modal -->
          <b-modal
            id="modal-image"
            hide-footer
            content-class="shadow"
            title="หลักฐานการสมัครสมาชิก"
            size="xl"
          >
            <form v-on:submit.prevent="status_imgSave">
              <div class="table-responsive">
                <table class="table">
                  <thead class="thead-dark">
                    <tr>
                      <th scope="col">หัวข้อ</th>
                      <th scope="col">รูปภาพ</th>
                      <th scope="col">สถานะ</th>
                      <th scope="col">หมายเหตุ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">สำเนาทะเบียนบ้าน</td>
                      <td>
                        <img
                          :src="api_img + image_name[0].name"
                          alt=""
                          style="width: 100px"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="image_name[0].status"
                          :selected="image_name[0].status"
                        >
                          <option selected>เลือกสถานะ</option>
                          <option value="0">รอตรวจสอบ</option>
                          <option value="1">ผ่าน</option>
                          <option value="2">ไม่ผ่าน</option>
                        </select>
                      </td>
                      <td>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="image_name[0].des"
                            house_particulars_img
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">สำเนาบัตรประชาชน</td>
                      <td>
                        <img
                          :src="api_img + image_name[1].name"
                          alt=""
                          style="width: 100px"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="image_name[1].status"
                          :selected="image_name[1].status"
                        >
                          <option selected>เลือกสถานะ</option>
                          <option value="0">รอตรวจสอบ</option>
                          <option value="1">ผ่าน</option>
                          <option value="2">ไม่ผ่าน</option>
                        </select>
                      </td>
                      <td>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="image_name[1].des"
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        สำเนาทะเบียนพาณิชย์หรือทะเบียนการค้า/หนังสือรับรองการจดทะเบียน
                      </td>
                      <td>
                        <img
                          :src="api_img + image_name[2].name"
                          alt=""
                          style="width: 100px"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="image_name[2].status"
                          :selected="image_name[2].status"
                        >
                          <option selected>เลือกสถานะ</option>
                          <option value="0">รอตรวจสอบ</option>
                          <option value="1">ผ่าน</option>
                          <option value="2">ไม่ผ่าน</option>
                        </select>
                      </td>
                      <td>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="image_name[2].des"
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        อัพโหลดรูปถ่าย 1 หรือ 2 นิ้ว จำนวน 2 รูป
                      </td>
                      <td>
                        <img
                          :src="api_img + image_name[3].name"
                          alt=""
                          style="width: 100px"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="image_name[3].status"
                          :selected="image_name[3].status"
                        >
                          <option selected>เลือกสถานะ</option>
                          <option value="0">รอตรวจสอบ</option>
                          <option value="1">ผ่าน</option>
                          <option value="2">ไม่ผ่าน</option>
                        </select>
                      </td>
                      <td>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="image_name[3].des"
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td scope="row">
                        อัพโหลดรูป ค่าบำรุงสมาชิก (รายปี) 1,000 บาท/ปี
                      </td>
                      <td>
                        <img
                          :src="api_img + image_name[4].name"
                          alt=""
                          style="width: 100px"
                        />
                      </td>
                      <td>
                        <select
                          class="form-select form-select-lg"
                          aria-label=".form-select-sm example"
                          v-model="image_name[4].status"
                          :selected="image_name[4].status"
                        >
                          <option selected>เลือกสถานะ</option>
                          <option value="0">รอตรวจสอบ</option>
                          <option value="1">ผ่าน</option>
                          <option value="2">ไม่ผ่าน</option>
                        </select>
                      </td>
                      <td>
                        <div class="form-group">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            v-model="image_name[4].des"
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-secondary mb-5 mt-5 mr-2"
                  @click="$bvModal.hide('modal-image')"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  class="btn btn-primary mb-5 mt-5"
                  @click="$bvModal.hide('modal-image')"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </b-modal>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
const customLabels = {
  first: "fisrt",
  last: "last",
  previous: "<",
  next: ">",
};
const api_img = "https://express.crm-flow.com/";
let axios = require("axios");
export default {
  name: "Member",
  data() {
    return {
      status: "all",
      pageOfItems: [],
      customLabels,
      activeItem: "lia",
      arr: {
        username: "",
        password: "",
        repassword: "",
        b_date: "",
        gender: "",
        firstname: "",
        lastname: "",
        age: "",
        married: "",
        address: {
          h_num: "",
          road: "",
          locality: "",
          district: "",
          province: "",
          zip_code: "",
        },
        commercial_affairs: "",
        member_type: "",
        commercial_address: "",
        phone: "",
        mobile: "",
        managing_partner: {
          gender: "",
          fullname: "",
        },
        house_particulars_img: "",
        id_card_img: "",
        commercial_particulars_img: "",
        profile_img: "",
        slip_img: "",
      },
      member_id: "",
      img_status: {
        house_particulars_img: {},
        id_card_img: {},
        commercial_particulars_img: {},
        profile_img: {},
        slip_img: {},
      },
      image_update: {
        house_particulars_img: { name: "" },
        id_card_img: { name: "" },
        commercial_particulars_img: { name: "" },
        profile_img: { name: "" },
        slip_img: { name: "" },
      },
      api_img,
      members: "",
      edit_member: "",
      member_image: "",
      image_name: [],
      imgmodal: false,
      classvalidate: {
        borderColor: "",
      },
      member: {
        username: "",
        password: "",
        repassword: "",
        b_date: "",
        gender: "",
        firstname: "",
        lastname: "",
        age: "",
        married: "",
        address: {
          h_num: "",
          road: "",
          locality: "",
          district: "",
          province: "",
          zip_code: "",
        },
        commercial_affairs: "",
        member_type: "",
        commercial_address: "",
        phone: "",
        mobile: "",
        managing_partner: {
          gender: "",
          fullname: "",
        },
        house_particulars_img: "",
        id_card_img: "",
        commercial_particulars_img: "",
        profile_img: "",
        slip_img: "",
      },
      profile_img: [],
      exampleItems: "",
    };
  },
  async created() {
    await this.initial();
    await this.getMembers();
    await this.gg();
  },
  computed: {
    get() {
      return this.$store.getters.getNews;
    },
  },
  mounted() {
    let addScript = document.createElement("script");
    addScript.setAttribute("src", "/assets/js/main.js");
    document.head.appendChild(addScript);
  },
  methods: {
    async getMembers() {
      var config = {
        method: "get",
        url: "https://express.crm-flow.com/api/registerforms/check",
        headers: {},
      };
      await axios(config)
        .then(async (response) => {
          this.members = await response.data;
          for (const value of Object.entries(this.members)) {
            // console.log(value[1]);
            value[1].address = await JSON.parse(value[1].address);
            value[1].managing_partner = await JSON.parse(
              value[1].managing_partner
            );
          }
          this.exampleItems = [...this.members.keys()].map((i) => ({
            id: i,
            member: this.members[i],
          }));
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async initial() {
      for (let i = 0; i < 5; i++) {
        this.image_name.push({ name: "", status: "0", des: "" });
      }
    },
    async getMembers_image(member_id) {
      this.imgmodal = true;
      this.member_id = member_id;
      var data = JSON.stringify({ member_id: this.member_id });
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/image/get",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(async (response) => {
          // this.image_name = response.data;
          // console.log(response.data);
          this.members.img = await response.data;
          for (let i = 0; i < response.data.length; i++) {
            this.image_update[response.data[i].img_name] = {
              name: response.data[i].img,
            };
            this.image_name[i].name = response.data[i].img;
            this.image_name[i].status = response.data[i].status;
            this.image_name[i].des = response.data[i].description;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    async status_imgSave() {
      var data = JSON.stringify({
        member_id: this.member_id,
        image_name: this.image_name,
      });
      var config = {
        method: "post",
        url: "https://express.crm-flow.com/api/registerforms/statusimgsave",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      await axios(config)
        .then(async (response) => {
          this.$notify({
            type: "success",
            title: "ทำการายการสำเร็จ",
            text: "ตรวจสอบสมาชิกสำเร็จ",
          });
          this.getMembers();
          // this.image_name = response.data;
          // console.log(response.data);
          this.imgmodal = false;
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // editMember(index) {
    //   this.edit_member = this.members[index];
    // },
    async getMembers_profile(index, member_id) {
      this.member = this.members[index];

      await this.getMembers_image(member_id);
    },
    async onSubmit() {
      //   alert('res');
      let data = new FormData();
      data.append(
        "house_particulars_img",
        this.arr.house_particulars_img,
        this.arr.house_particulars_img.name
      );
      data.append(
        "id_card_img",
        this.arr.id_card_img,
        this.arr.id_card_img.name
      );
      data.append(
        "commercial_particulars_img",
        this.arr.commercial_particulars_img,
        this.arr.commercial_particulars_img.name
      );
      data.append(
        "profile_img",
        this.arr.profile_img,
        this.arr.profile_img.name
      );
      data.append("slip_img", this.arr.slip_img, this.arr.slip_img.name);
      data.append("gender", this.arr.gender);
      data.append("firstname", this.arr.firstname);
      data.append("lastname", this.arr.lastname);
      data.append("age", this.arr.age);
      data.append("b_date", this.arr.b_date);
      data.append("married", this.arr.married);
      data.append("address", JSON.stringify(this.arr.address));
      data.append("commercial_affairs", this.arr.commercial_affairs);
      data.append("commercial_type", this.arr.commercial_type);
      data.append("commercial_address", this.arr.commercial_address);
      data.append("phone", this.arr.phone);
      data.append("mobile", this.arr.mobile);
      data.append("member_type", this.arr.member_type);
      data.append(
        "managing_partner",
        JSON.stringify(this.arr.managing_partner)
      );
      data.append("username", this.arr.username);
      data.append("password", this.arr.password);
      if (
        this.arr.repassword.trim() == this.arr.password.trim() &&
        this.arr.b_date != ""
      ) {
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/registerforms",
          data: data,
        };
        await axios(config)
          .then((response) => {
            this.$notify({
              type: "success",
              title: "ทำการายการสำเร็จ",
              text: "สมัครสมาชิกสำเร็จ",
            });
            this.getMembers();
            this.arr = {
              username: "",
              password: "",
              repassword: "",
              b_date: "",
              gender: "",
              firstname: "",
              lastname: "",
              age: "",
              married: "",
              address: {
                h_num: "",
                road: "",
                locality: "",
                district: "",
                province: "",
                zip_code: "",
              },
              commercial_affairs: "",
              member_type: "",
              commercial_address: "",
              phone: "",
              mobile: "",
              managing_partner: {
                gender: "",
                fullname: "",
              },
              house_particulars_img: "",
              id_card_img: "",
              commercial_particulars_img: "",
              profile_img: "",
              slip_img: "",
            };
            // console.log(localStorage.getItem("username"));
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    async updateMember() {
      // alert("res");
      let data = new FormData();
      for (const [key, value] of Object.entries(this.image_update)) {
        if (value.file) data.append([key], value.file);
        // console.log(value)
        // console.log(value.image_name);
      }
      // data.append(
      //   "house_particulars_img",
      //   this.member.house_particulars_img,
      //   this.member.house_particulars_img.name
      // );
      // data.append(
      //   "id_card_img",
      //   this.member.id_card_img,
      //   this.member.id_card_img.name
      // );
      // data.append(
      //   "commercial_particulars_img",
      //   this.member.commercial_particulars_img,
      //   this.member.commercial_particulars_img.name
      // );
      // data.append(
      //   "profile_img",
      //   this.member.profile_img,
      //   this.member.profile_img.name
      // );
      // data.append("slip_img", this.member.slip_img, this.member.slip_img.name);
      data.append("member", JSON.stringify(this.member));
      // data.append("gender", this.member.gender);
      // data.append("firstname", this.member.firstname);
      // data.append("lastname", this.member.lastname);
      // data.append("age", this.member.age);
      // data.append("b_date", this.member.b_date);
      // data.append("married", this.member.married);
      // data.append("address", JSON.stringify(this.member.address));
      // data.append("commercial_affairs", this.member.commercial_affairs);
      // data.append("commercial_type", this.member.commercial_type);
      // data.append("commercial_address", this.member.commercial_address);
      // data.append("phone", this.member.phone);
      // data.append("mobile", this.member.mobile);
      // data.append("member_type", this.member.member_type);
      // data.append("member_id", this.member.member_id);
      // data.append(
      //   "managing_partner",
      //   JSON.stringify(this.member.managing_partner)
      // );
      // data.append("username", this.member.username);
      // data.append("password", this.member.password);
      if (
        // this.member.repassword.trim() == this.member.password.trim() &&
        this.member.b_date != ""
      ) {
        var config = {
          method: "post",
          url: "/api/registerforms/update",
          data: data,
        };
        await axios(config)
          .then((response) => {
            this.$notify({
              type: "success",
              title: "ทำการายการสำเร็จ",
              text: "แก้ไขข้อมูลสมาชิกสำเร็จ",
            });
            this.getMembers();
            // console.log(localStorage.getItem("username"));
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    async deleteMember(member_id) {
      // alert(id);
      if (confirm("คุณต้องการจะลบรายการนี้หรือไม่?")) {
        var data = JSON.stringify({ member_id: member_id });
        var config = {
          method: "post",
          url: "https://express.crm-flow.com/api/registerforms/delete",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        await axios(config)
          .then((response) => {
            this.$notify({
              type: "success",
              title: "ทำการายการสำเร็จ",
              text: "ลบสมาชิกสำเร็จ",
            });
            this.getMembers();
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    onChangePage(pageOfItems) {
      // update page of items
      this.pageOfItems = pageOfItems;
    },
    validate() {
      if (this.arr.repassword.trim() == this.arr.password.trim()) {
        this.classvalidate.borderColor = "";
        console.log(true);
      } else {
        this.classvalidate.borderColor = "red";
      }
    },
    processFile0(event) {
      this.arr.house_particulars_img = event.target.files[0];
    },
    processFile1(event) {
      this.arr.id_card_img = event.target.files[0];
    },
    processFile2(event) {
      this.arr.commercial_particulars_img = event.target.files[0];
    },
    processFile3(event) {
      this.arr.profile_img = event.target.files[0];
    },
    processFile4(event) {
      this.arr.slip_img = event.target.files[0];
    },
    async processFile(event, image_name) {
      this.image_update[image_name] = {
        file: await event.target.files[0],
        name: event.target.files[0].name,
      };
    },
  },
  components: {},
};
</script>

<style scoped>
.wi-img img {
  width: 100px;
}
td button {
  margin-left: 10px;
}
.modal-dialog {
  width: 100%;
}
.sidebar-header img {
  width: 75px;
  height: 75px;
}
.wid .modal-dialog {
  max-width: 75% !important;
}
.modal-dialog {
  max-width: 60% !important;
}
</style>
