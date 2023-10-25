import {LineDisplay} from './line.display';
import {PermissionInterface} from '../permission.interface';
import {ColumnDisplay} from './column.display';

export class GroupDisplay {
  columns: string[] = [];
  lines: LineDisplay[] = [];
  name: string;

  static generateGroupsFromPermissions(permissions: PermissionInterface[]): GroupDisplay[] {
    const groups: GroupDisplay[] = [];

    permissions.forEach(permission => {

      const keys = permission.code.split('.');

      // Get or Create group
      let group = groups.find((existingGroup: GroupDisplay) => {
        return existingGroup.name === keys[0];
      });

      if (!group) {
        group = new GroupDisplay();
        group.name = keys[0];

        groups.push(group);
      }


      // Get or Create lines
      let line = group.lines.find((existingLine: LineDisplay) => {
        return existingLine.name === keys[1];
      });

      if (!line) {
        line = new LineDisplay();
        line.name = keys[1];

        group.lines.push(line);
      }

      // Get Or Create Columns
      let column = line.columns.find((existingColumn: ColumnDisplay) => {
        return existingColumn.name === keys[2];
      });

      if (!column) {
        column = new ColumnDisplay();

        column.name = keys[2];
        column.permissionId = permission.id;
        column.description = permission.description;
        column.code = permission.code;


        if (group.columns.indexOf(column.name) === -1) {
          group.columns.push(column.name);
        }

        line.columns.push(column);
      }
    });

    return groups;
  }
}
