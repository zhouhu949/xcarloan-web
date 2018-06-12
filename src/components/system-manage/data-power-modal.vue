<!--分配角色-->
<template>
  <section class="component data-power-modal">
    <i-row :gutter="10">
      <i-col :span="6" class="form-col">
        <div class="form-title" >
          <span>可选机构</span>
        </div>
      </i-col>
      <i-col :span="18">
        <div class="form-title-two">
          <i-tree show-checkbox :data="treeData" @on-check-change="treeCheckChange"></i-tree>
        </div>
      </i-col>
    </i-row>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { ManageService } from "~/services/manage-service/manage.service";
import { Dependencies } from "~/core/decorator";
import { UserService } from "~/services/manage-service/user.service";

@Component({
  components: {}
})
export default class DataPowerModal extends Vue {
  @Dependencies(ManageService) private manageService: ManageService;
  @Dependencies(UserService) private userService: UserService;

  private columns1: any;
  private treeData: Array<any> = [];
  private allData: Array<any> = [];
  private userAllocatePrivilegeModel: any = {
    privilegeDeptsId: [],
    userId: ""
  };
  private treeCheckId: Array<any> = []; // 点击树复选框时选择的id
  private defaultCheckId: Array<any> = []; // 反显的数据权限id
  private flag: Boolean = false; // 判断数组为空是本身为空还是点击后为空
  created() {}
  getAllOrg(userId) {
    // 获取用户数据权限
    this.userService
      .findUserPrivileges({
        userId: userId
      })
      .subscribe(
        data => {
          this.defaultCheckId = data;
          this.getOriginTreeData();
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 获取组织树的原始数据
   */
  getOriginTreeData() {
    this.manageService.getAllDepartment().subscribe(
      data => {
        this.allData = data;
        this.createNewTree(this.allData);
      },
      ({ msg }) => {
        this.$Message.error(msg);
      }
    );
  }
  /**
   * 生成树
   */
  createNewTree(allData) {
    this.treeData = [];
    let root = allData.filter(v => v.deptPid === 0); // 获取树根
    // 遍历根对象push进树中
    root.forEach(item => {
      let node1 = {
        title: item.deptName,
        expand: true,
        id: item.id,
        checked: this.defaultCheckId.includes(item.id),
        children: this.getChild(item)
      };
      this.treeData.push(node1);
    });
  }
  /**
   * 获取相对根元素的子元素
   */
  getChild(item) {
    let child: any = [];
    // 判断子的父id与全部数据的id相等
    this.allData.map(val => {
      if (item.id === val.deptPid) {
        let node2 = {
          title: val.deptName,
          id: val.id,
          checked: this.defaultCheckId.includes(val.id),
          expand: true,
          children: this.getChild(val) // 迭代产生根
        };
        child.push(node2);
      }
    });
    return child;
  }
  resetTree() {
    // this.treeData = [];
  }
  /**
   * 分配用户数据权限
   */
  allotUserDataPower(userId) {
    if (this.treeCheckId.length) {
      this.userAllocatePrivilegeModel.privilegeDeptsId = this.treeCheckId;
    } else if (!this.treeCheckId.length && !this.flag) {
      this.userAllocatePrivilegeModel.privilegeDeptsId = this.defaultCheckId;
    } else {
      this.userAllocatePrivilegeModel.privilegeDeptsId = [];
    }
    this.userAllocatePrivilegeModel.userId = userId;
    this.userService
      .userAllocatePrivileges(this.userAllocatePrivilegeModel)
      .subscribe(
        data => {
          this.$Message.success("数据权限分配成功！");
          this.$emit("close");
        },
        ({ msg }) => {
          this.$Message.error(msg);
        }
      );
  }
  /**
   * 树复选框change事件
   */
  treeCheckChange(data) {
    this.treeCheckId = data.map(v => v.id);
    if (!this.treeCheckId.length) {
      this.userAllocatePrivilegeModel.privilegeDeptsId = [];
      this.flag = true;
    }
  }
}
</script>
<style lang="less" scoped>
    .component.data-power-modal{
        .form-col{
            .form-title{
                border:1px solid #D7D7D7;
                height:380px;
                span{
                    position:absolute;
                    top:50%;left:34px;
                }
            }
        }
         .form-title-two{
                border:1px solid #D7D7D7;
                height:380px;
                overflow: auto;
            }

    }

</style>
