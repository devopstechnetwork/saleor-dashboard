import { Button } from "@dashboard/components/Button";
import CardTitle from "@dashboard/components/CardTitle";
import { IconButton } from "@dashboard/components/IconButton";
import { TableButtonWrapper } from "@dashboard/components/TableButtonWrapper/TableButtonWrapper";
import TableRowLink from "@dashboard/components/TableRowLink";
import { AppsInstallationsQuery, JobStatusEnum } from "@dashboard/graphql";
import { renderCollection } from "@dashboard/misc";
import {
  Card,
  CircularProgress as Progress,
  TableBody,
  TableCell,
  Typography,
} from "@material-ui/core";
import {
  DeleteIcon,
  Indicator,
  ResponsiveTable,
  Tooltip,
  TooltipMountWrapper,
} from "@saleor/macaw-ui";
import clsx from "clsx";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { useStyles } from "../../styles";

export interface AppsInProgressProps {
  appsList: AppsInstallationsQuery["appsInstallations"];
  onAppInstallRetry: (id: string) => void;
  onRemove: (id: string) => void;
}

const AppsInProgress: React.FC<AppsInProgressProps> = ({
  appsList,
  onAppInstallRetry,
  onRemove,
  ...props
}) => {
  const intl = useIntl();
  const classes = useStyles(props);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          id: "nIrjSR",
          defaultMessage: "Ongoing Installations",
          description: "section header",
        })}
      />
      <ResponsiveTable>
        <TableBody>
          {renderCollection(
            appsList,
            ({
              status,
              appName,
              id,
              message,
            }: AppsInstallationsQuery["appsInstallations"][number]) => (
              <TableRowLink key={id} className={classes.tableRow}>
                <TableCell className={classes.colName}>
                  <span data-tc="name">{appName}</span>
                </TableCell>
                {status === JobStatusEnum.PENDING && (
                  <TableCell
                    className={clsx(
                      classes.colAction,
                      classes.colInstallAction,
                    )}
                  >
                    <Typography variant="body2" className={classes.text}>
                      <FormattedMessage
                        id="1qRwgQ"
                        defaultMessage="Installing app..."
                        description="app installation"
                      />
                    </Typography>
                    <div className={classes.colSpinner}>
                      <Progress size={20} />
                    </div>
                  </TableCell>
                )}
                {status === JobStatusEnum.FAILED && (
                  <TableCell
                    className={clsx(
                      classes.colAction,
                      classes.colInstallAction,
                    )}
                  >
                    <Typography variant="body2" className={classes.error}>
                      <FormattedMessage
                        id="Xl0o2y"
                        defaultMessage="Problem occured during installation"
                        description="app installation error"
                      />
                      <Tooltip title={message} variant="error">
                        <TooltipMountWrapper>
                          <Indicator icon="error" />
                        </TooltipMountWrapper>
                      </Tooltip>
                    </Typography>
                    <TableButtonWrapper>
                      <Button onClick={() => onAppInstallRetry(id)}>
                        <FormattedMessage
                          id="+c/f61"
                          defaultMessage="Retry"
                          description="retry installation"
                        />
                      </Button>
                    </TableButtonWrapper>
                    <TableButtonWrapper>
                      <IconButton
                        variant="secondary"
                        color="primary"
                        onClick={() => onRemove(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                )}
              </TableRowLink>
            ),
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

AppsInProgress.displayName = "AppsInProgress";
export default AppsInProgress;
